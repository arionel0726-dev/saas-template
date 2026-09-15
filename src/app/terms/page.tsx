import { LegalPage } from '@/components/legal/legal-page'
import { getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT()
	return pageMetadata({
		title: t('legal.terms.title'),
		description: t('legal.terms.intro', { appName: t('common.appName') }),
		path: '/terms'
	})
}

export default async function TermsPage() {
	const { t } = await getT()
	const appName = t('common.appName')

	return (
		<LegalPage
			title={t('legal.terms.title')}
			intro={t('legal.terms.intro', { appName })}
			sections={[
				{
					title: t('legal.terms.account.title'),
					body: t('legal.terms.account.body')
				},
				{
					title: t('legal.terms.billing.title'),
					body: t('legal.terms.billing.body')
				},
				{
					title: t('legal.terms.liability.title'),
					body: t('legal.terms.liability.body')
				},
				{
					title: t('legal.terms.termination.title'),
					body: t('legal.terms.termination.body')
				},
				{
					title: t('legal.terms.changes.title'),
					body: t('legal.terms.changes.body')
				},
				{
					title: t('legal.terms.contact.title'),
					body: t('legal.terms.contact.body', { appName })
				}
			]}
		/>
	)
}
