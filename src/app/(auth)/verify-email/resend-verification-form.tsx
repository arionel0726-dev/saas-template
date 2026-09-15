'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/lib/routes'
import { useState } from 'react'

export function ResendVerificationForm({
	initialEmail
}: {
	initialEmail?: string
}) {
	const { t } = useI18n()
	const [email, setEmail] = useState(initialEmail ?? '')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		const { error } = await authClient.sendVerificationEmail({
			email,
			callbackURL: ROUTES.verifyEmail
		})
		setLoading(false)
		if (error) setError(error.message ?? t('auth.error.generic'))
		else setSent(true)
	}

	if (sent) {
		return (
			<p className="text-sm text-muted-foreground text-center">
				{t('auth.verifyEmail.resent')}
			</p>
		)
	}

	return (
		<form onSubmit={onSubmit} className="grid gap-3">
			<div className="grid gap-1.5">
				<Label htmlFor="email">{t('auth.email')}</Label>
				<Input
					id="email"
					type="email"
					required
					autoComplete="email"
					className="h-11 text-base"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			{error && (
				<p className="text-sm text-destructive" role="alert">
					{error}
				</p>
			)}
			<Button type="submit" className="w-full h-11" disabled={loading}>
				{loading ? '…' : t('auth.verifyEmail.resend')}
			</Button>
		</form>
	)
}
