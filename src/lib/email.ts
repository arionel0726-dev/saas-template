import { emailOutbox } from '@/db/schema'
import { ResetPasswordEmail } from '@/emails/reset-password'
import { VerifyEmailEmail } from '@/emails/verify-email'
import { WelcomeEmail } from '@/emails/welcome'
import { captureError } from '@/lib/capture-error'
import { db } from '@/lib/db'
import { render } from '@react-email/render'
import { and, eq, lt } from 'drizzle-orm'
import { Resend } from 'resend'

// Ленивая инициализация: не падаем при импорте модуля, если ключ не задан
function getResend() {
	if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
	return new Resend(process.env.RESEND_API_KEY)
}

const TEMPLATES = {
	welcome: {
		subject: 'Добро пожаловать',
		render: (p: { name: string }) => render(WelcomeEmail(p))
	},
	reset: {
		subject: 'Сброс пароля',
		render: (p: { url: string }) => render(ResetPasswordEmail(p))
	},
	verify: {
		subject: 'Подтвердите email',
		render: (p: { url: string }) => render(VerifyEmailEmail(p))
	}
} as const

export async function enqueueEmail(
	to: string,
	template: keyof typeof TEMPLATES,
	payload: Record<string, unknown>
) {
	await db
		.insert(emailOutbox)
		.values({ to, template, payload, subject: TEMPLATES[template].subject })
}

export async function processOutbox(limit = 10) {
	const resend = getResend() // ← здесь создаём клиент, не на верхнем уровне
	const pending = await db
		.select()
		.from(emailOutbox)
		.where(eq(emailOutbox.status, 'pending'))
		.limit(limit)

	for (const job of pending) {
		try {
			const html = await TEMPLATES[
				job.template as keyof typeof TEMPLATES
			].render(job.payload as never)
			await resend.emails.send({
				from: process.env.EMAIL_FROM!,
				to: job.to,
				subject: job.subject,
				html
			})
			await db
				.update(emailOutbox)
				.set({ status: 'sent', sentAt: new Date() })
				.where(eq(emailOutbox.id, job.id))
		} catch (e) {
			await captureError(e, { source: 'cron', url: '/api/cron/outbox' })
			const attempts = job.attempts + 1
			await db
				.update(emailOutbox)
				.set({ status: attempts >= 3 ? 'failed' : 'pending', attempts })
				.where(eq(emailOutbox.id, job.id))
		}
	}
}

// Чистка email_outbox: отправленные письма старше 30 дней больше не нужны
export async function purgeOutbox(olderThanDays = 30) {
	const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000)
	const deleted = await db
		.delete(emailOutbox)
		.where(and(eq(emailOutbox.status, 'sent'), lt(emailOutbox.sentAt, cutoff)))
		.returning({ id: emailOutbox.id })
	return deleted.length
}
