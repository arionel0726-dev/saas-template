'use client'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function LoginPage() {
	const { t } = useI18n()
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		const { error } = await authClient.signIn.email({ email, password })
		setLoading(false)
		if (error) setError(error.message ?? t('auth.error.generic'))
		else router.push(ROUTES.afterLogin)
	}

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body gap-4 p-6 sm:p-8">
				<h1 className="card-title justify-center text-2xl">
					{t('auth.login.title')}
				</h1>
				<button
					className="btn btn-outline btn-block min-h-12"
					onClick={() =>
						authClient.signIn.social({
							provider: 'google',
							callbackURL: `${ROUTES.afterLogin}`
						})
					}
				>
					{t('auth.google')}
				</button>
				<div className="divider my-1">{t('auth.or')}</div>
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
					<label className="flex flex-col gap-1">
						<span className="text-sm opacity-70">{t('auth.email')}</span>
						<input
							type="email"
							required
							autoComplete="email"
							className="input input-bordered w-full text-base" /* text-base — анти-зум iOS */
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</label>
					<label className="flex flex-col gap-1">
						<span className="text-sm opacity-70">{t('auth.password')}</span>
						<input
							type="password"
							required
							minLength={8}
							autoComplete="current-password"
							className="input input-bordered w-full text-base"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</label>
					{error && (
						<p className="text-error text-sm" role="alert">
							{error}
						</p>
					)}
					<button
						className="btn btn-primary btn-block min-h-12"
						disabled={loading}
					>
						{loading ? (
							<span className="loading loading-spinner" />
						) : (
							t('auth.login.submit')
						)}
					</button>
				</form>
				<p className="text-center text-sm">
					{t('auth.login.noAccount')}{' '}
					<Link href="/register" className="link link-primary">
						{t('auth.register.title')}
					</Link>
				</p>
			</div>
		</div>
	)
}
