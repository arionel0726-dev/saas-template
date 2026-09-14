'use client'
import { useI18n } from '@/i18n/context'

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
	const { t } = useI18n()
	return (
		<section className="px-4 py-10 max-w-2xl mx-auto w-full">
			<h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
				{t('landing.faq.title')}
			</h2>
			<div className="flex flex-col gap-2">
				{items.map(item => (
					<div
						key={item.q}
						className="collapse collapse-arrow bg-base-100 shadow"
					>
						<input type="radio" name="faq" />
						<div className="collapse-title font-medium min-h-12">{item.q}</div>
						<div className="collapse-content text-sm opacity-80">{item.a}</div>
					</div>
				))}
			</div>
		</section>
	)
}
