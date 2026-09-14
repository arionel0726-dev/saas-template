'use client'
import { useI18n } from '@/i18n/context'
import { useEffect } from 'react'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const { t } = useI18n()
	useEffect(() => {
		fetch('/api/errors', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: error.message,
				stack: error.stack,
				url: window.location.href
			})
		}).catch(() => {})
	}, [error])

	return (
		<div className="min-h-dvh grid place-items-center bg-base-200 p-4">
			<div className="card bg-base-100 shadow-xl w-full max-w-sm">
				<div className="card-body items-center text-center gap-4">
					<h2 className="card-title">{t('auth.error.generic')}</h2>
					<button
						className="btn btn-primary btn-block min-h-12"
						onClick={reset}
					>
						{t('common.save')}{' '}
						{/* лучше добавить ключ 'common.retry': 'Попробовать снова' */}
					</button>
				</div>
			</div>
		</div>
	)
}
