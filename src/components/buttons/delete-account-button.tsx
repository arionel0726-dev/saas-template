'use client'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteAccountButton() {
	const { t } = useI18n()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function onDelete() {
		if (!window.confirm(t('account.deleteConfirm'))) return
		setError(null)
		setLoading(true)
		const { error } = await authClient.deleteUser({
			callbackURL: ROUTES.login
		})
		setLoading(false)
		if (error) setError(error.message ?? t('auth.error.generic'))
		else router.push(ROUTES.login)
	}

	return (
		<div className="grid gap-2">
			<Button
				variant="destructive"
				className="w-full h-11"
				disabled={loading}
				onClick={onDelete}
			>
				{loading ? '…' : t('account.delete')}
			</Button>
			{error && (
				<p className="text-sm text-destructive" role="alert">
					{error}
				</p>
			)}
		</div>
	)
}
