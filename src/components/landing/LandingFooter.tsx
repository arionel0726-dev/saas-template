import { getT } from '@/i18n/server'
import Link from 'next/link'

export async function LandingFooter() {
	const { t } = await getT()
	return (
		<footer className="footer footer-center bg-base-100 text-base-content p-6 sm:p-8 gap-2">
			<nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
				<Link href="/price" className="link link-hover">
					{t('nav.pricing')}
				</Link>
				<Link href="/login" className="link link-hover">
					{t('nav.signIn')}
				</Link>
			</nav>
			<p className="text-sm opacity-60">
				© {new Date().getFullYear()} {t('common.appName')}
			</p>
		</footer>
	)
}
