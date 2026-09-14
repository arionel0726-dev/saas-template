'use client'
import { useI18n } from '@/i18n/context'

type Testimonial = { name: string; role: string; text: string }

export function Testimonials({ items }: { items: Testimonial[] }) {
	const { t } = useI18n()
	return (
		<section className="px-4 py-12 max-w-5xl mx-auto">
			<h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
				{t('landing.testimonials.title')}
			</h2>
			{/* 1 колонка на мобиле → 2 на sm → 3 на lg */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{items.map(item => (
					<figure key={item.name} className="card bg-base-100 shadow p-6">
						<blockquote className="text-sm opacity-80 mb-4">
							«{item.text}»
						</blockquote>
						<figcaption>
							<p className="font-medium">{item.name}</p>
							<p className="text-xs opacity-60">{item.role}</p>
						</figcaption>
					</figure>
				))}
			</div>
		</section>
	)
}
