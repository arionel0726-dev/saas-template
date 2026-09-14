'use client'
import { useI18n } from '@/i18n/context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CancelSubscriptionButton() {
	const { t } = useI18n()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function cancel() {
		if (!window.confirm(t('billing.cancelConfirm'))) return
		setError(null)
		setLoading(true)
		const res = await fetch('/api/billing/cancel', { method: 'POST' })
		setLoading(false)
		if (res.ok) router.refresh()
		else setError(t('auth.error.generic'))
	}

	return (
		<div className="flex flex-col gap-2">
			<button
				className="btn btn-error btn-outline btn-block min-h-12"
				disabled={loading}
				onClick={cancel}
			>
				{loading ? (
					<span className="loading loading-spinner" />
				) : (
					t('billing.cancel')
				)}
			</button>
			{error && (
				<p className="text-error text-sm" role="alert">
					{error}
				</p>
			)}
		</div>
	)
}
