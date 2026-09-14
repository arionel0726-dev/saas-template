import { getT } from '@/i18n/server'
import Link from 'next/link'

export default async function PricePage() {
	const { t } = await getT()
	const plans = [
		{
			name: t('price.free.name'),
			price: '$0',
			features: [t('price.free.f1'), t('price.free.f2')],
			href: '/register'
		},
		{
			name: t('price.pro.name'),
			price: '$9',
			features: [t('price.pro.f1'), t('price.pro.f2')],
			href: '/api/billing/checkout?plan=pro'
		}
	]
	return (
		<div className="min-h-dvh bg-base-200 py-10 sm:py-16">
			<div className="text-center px-4 mb-8 sm:mb-12">
				<h1 className="text-3xl sm:text-4xl font-bold">{t('price.title')}</h1>
				<p className="opacity-70 mt-2">{t('price.subtitle')}</p>
			</div>
			{/* grid-cols-1 = mobile-first, растём вверх */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 max-w-4xl mx-auto">
				{plans.map(plan => (
					<div key={plan.name} className="card bg-base-100 shadow-xl">
						<div className="card-body p-6">
							<h2 className="card-title">{plan.name}</h2>
							<p className="text-3xl font-bold">
								{plan.price}
								<span className="text-sm font-normal">
									{t('price.perMonth')}
								</span>
							</p>
							<ul className="flex flex-col gap-1 my-4">
								{plan.features.map(f => (
									<li key={f} className="flex gap-2">
										<span>✓</span>
										{f}
									</li>
								))}
							</ul>
							<Link
								href={plan.href}
								className="btn btn-primary btn-block min-h-12"
							>
								{t('price.choose')}
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
