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
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function ResetPasswordForm() {
	const { t } = useI18n()
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [done, setDone] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!token) {
			setError(t('auth.resetPassword.invalidLink'))
			return
		}
		setError(null)
		setLoading(true)
		const { error } = await authClient.resetPassword({
			newPassword: password,
			token
		})
		setLoading(false)
		if (error) setError(error.message ?? t('auth.error.generic'))
		else setDone(true)
	}

	if (!token) {
		return (
			<p className="text-sm text-destructive text-center">
				{t('auth.resetPassword.invalidLink')}
			</p>
		)
	}

	if (done) {
		return (
			<div className="grid gap-4">
				<p className="text-sm text-muted-foreground text-center">
					{t('auth.resetPassword.done')}
				</p>
				<Button className="w-full h-11" onClick={() => router.push(ROUTES.login)}>
					{t('auth.login.title')}
				</Button>
			</div>
		)
	}

	return (
		<form onSubmit={onSubmit} className="grid gap-3">
			<div className="grid gap-1.5">
				<Label htmlFor="password">{t('auth.resetPassword.newPassword')}</Label>
				<Input
					id="password"
					type="password"
					required
					minLength={8}
					autoComplete="new-password"
					className="h-11 text-base"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			{error && (
				<p className="text-sm text-destructive" role="alert">
					{error}
				</p>
			)}
			<Button type="submit" className="w-full h-11" disabled={loading}>
				{loading ? '…' : t('auth.resetPassword.submit')}
			</Button>
		</form>
	)
}

export default function ResetPasswordPage() {
	const { t } = useI18n()
	return (
		<Card className="w-full shadow-xl">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl text-center">
					{t('auth.resetPassword.title')}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Suspense fallback={<p className="text-sm text-muted-foreground">…</p>}>
					<ResetPasswordForm />
				</Suspense>
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
