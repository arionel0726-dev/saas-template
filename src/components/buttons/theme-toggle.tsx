'use client'
import { useI18n } from '@/i18n/context'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
export function ThemeToggle() {
	const { t } = useI18n()
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const saved = localStorage.getItem('theme')
		const initial = saved === 'dark' ? 'dark' : 'light'
		setTheme(initial)
		document.documentElement.setAttribute('data-theme', initial)
	}, [])

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark'
		setTheme(next)
		document.documentElement.setAttribute('data-theme', next)
		localStorage.setItem('theme', next)
	}

	return (
		<button
			className="btn btn-ghost btn-sm min-h-10"
			onClick={toggle}
			aria-label={t('theme.toggle')}
		>
			{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	)
}
