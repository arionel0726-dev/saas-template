'use client'
import { LOCALES } from '@/i18n/config'
import { useI18n } from '@/i18n/context'

export function LanguageSwitcher() {
	const { locale, setLocale } = useI18n()
	return (
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
	)
}
