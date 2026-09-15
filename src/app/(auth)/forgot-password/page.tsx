'use client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { useState } from 'react'

export default function ForgotPasswordPage() {
	const { t } = useI18n()
	const [email, setEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		const { error } = await authClient.requestPasswordReset({
			email,
			redirectTo: ROUTES.resetPassword
		})
		setLoading(false)
		// better-auth намеренно не раскрывает, существует ли такой email —
		// показываем один и тот же успех независимо от ответа
		if (error) setError(error.message ?? t('auth.error.generic'))
		else setSent(true)
	}

	return (
		<Card className="w-full shadow-xl">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl text-center">
					{t('auth.forgotPassword.title')}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				{sent ? (
					<p className="text-sm text-muted-foreground text-center">
						{t('auth.forgotPassword.sent')}
					</p>
				) : (
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
							{loading ? '…' : t('auth.forgotPassword.submit')}
						</Button>
					</form>
				)}
			</CardContent>
			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground">
					<Link href={ROUTES.login} className="text-primary hover:underline">
						{t('auth.login.title')}
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
