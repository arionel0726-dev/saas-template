import { getT } from '@/i18n/server'
import Link from 'next/link'

export async function LandingHeader() {
	const { t } = await getT()
	return (
		<header className="navbar bg-base-100 shadow px-4 sticky top-0 z-10">
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-lg px-2">
					{t('common.appName')}
				</Link>
			</div>
			<nav className="flex items-center gap-1 sm:gap-2">
				<Link
					href="/price"
					className="btn btn-ghost btn-sm min-h-10 hidden sm:inline-flex"
				>
					{t('nav.pricing')}
				</Link>
				<Link href="/login" className="btn btn-ghost btn-sm min-h-10">
					{t('nav.signIn')}
				</Link>
				<Link href="/register" className="btn btn-primary btn-sm min-h-10">
					{t('auth.register.title')}
				</Link>
			</nav>
		</header>
	)
}
