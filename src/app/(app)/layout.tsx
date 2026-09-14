import { SignOutButton } from '@/components/buttons/sign-out-button'
import { getT } from '@/i18n/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AppLayout({
	children
}: {
	children: React.ReactNode
}) {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session) redirect('/login')
	const { t } = await getT()

	return (
		<div className="min-h-dvh bg-base-200">
			<header className="navbar bg-base-100 shadow px-4">
				<div className="flex-1">
					<Link
						href="/dashboard"
						className="btn btn-ghost text-lg sm:text-xl px-2"
					>
						{t('common.appName')}
					</Link>
				</div>
				<nav className="flex items-center gap-1 sm:gap-3">
					<Link href="/price" className="btn btn-ghost btn-sm">
						{t('nav.pricing')}
					</Link>
					{/* на мобиле email прячем — не влезает в navbar */}
					<span className="hidden md:inline text-sm opacity-70 max-w-40 truncate">
						{session.user.email}
					</span>
					<SignOutButton />
				</nav>
			</header>
			<main className="container mx-auto p-4 sm:p-6">{children}</main>
		</div>
	)
}
