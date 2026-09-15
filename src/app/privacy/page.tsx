import { LegalPage } from '@/components/legal/legal-page'
import { getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT()
	return pageMetadata({
		title: t('legal.privacy.title'),
		description: t('legal.privacy.intro', { appName: t('common.appName') }),
		path: '/privacy'
	})
}

export default async function PrivacyPage() {
	const { t } = await getT()
	const appName = t('common.appName')

	return (
		<LegalPage
			title={t('legal.privacy.title')}
			intro={t('legal.privacy.intro', { appName })}
			sections={[
				{
					title: t('legal.privacy.dataCollected.title'),
					body: t('legal.privacy.dataCollected.body')
				},
				{
					title: t('legal.privacy.dataUse.title'),
					body: t('legal.privacy.dataUse.body')
				},
				{
					title: t('legal.privacy.sharing.title'),
					body: t('legal.privacy.sharing.body')
				},
				{
					title: t('legal.privacy.cookies.title'),
					body: t('legal.privacy.cookies.body')
				},
				{
					title: t('legal.privacy.rights.title'),
					body: t('legal.privacy.rights.body')
				},
				{
					title: t('legal.privacy.contact.title'),
					body: t('legal.privacy.contact.body', { appName })
				}
			]}
		/>
	)
}
