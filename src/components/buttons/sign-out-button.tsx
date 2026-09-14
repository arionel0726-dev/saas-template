'use client'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
	const { t } = useI18n()
	const router = useRouter()
	return (
		<button
			className="btn btn-ghost btn-sm min-h-10"
			onClick={async () => {
				await authClient.signOut()
				router.push('/login')
			}}
		>
			{t('nav.signOut')}
		</button>
	)
}
