'use client'
import { LOCALES } from '@/i18n/config'
import { useI18n } from '@/i18n/context'
import { Languages } from 'lucide-react'
export function LanguageSwitcher() {
	const { locale, setLocale } = useI18n()
	return (
		<label className="flex items-center gap-1">
			<Languages size={16} className="opacity-60" />
			<select
				className="select select-bordered select-sm"
				value={locale}
				onChange={e => setLocale(e.target.value as typeof locale)}
				aria-label="Language"
			>
				{LOCALES.map(l => (
					<option key={l} value={l}>
						{l.toUpperCase()}
					</option>
				))}
			</select>
		</label>
	)
}
