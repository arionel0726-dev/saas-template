import { emailOutbox } from '@/db/schema'
import { WelcomeEmail } from '@/emails/welcome'
import { db } from '@/lib/db'
import { render } from '@react-email/render'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TEMPLATES = {
	welcome: {
		subject: 'Добро пожаловать',
		render: (p: { name: string }) => render(WelcomeEmail(p))
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

// Вызвается из cron-роута — см. ниже
export async function processOutbox(limit = 10) {
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
		} catch {
			await db
				.update(emailOutbox)
				.set({
					status: 'failed',
					attempts: job.attempts + 1
				})
				.where(eq(emailOutbox.id, job.id))
		}
	}
}
