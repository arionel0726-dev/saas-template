'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/context'
import { authClient } from '@/lib/auth-client'
import { ROUTES } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteAccountButton() {
	const { t } = useI18n()
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	function onOpenChange(next: boolean) {
		setOpen(next)
		if (!next) {
			setPassword('')
			setError(null)
		}
	}

	async function onDelete() {
		setError(null)
		setLoading(true)
		// Без пароля better-auth удаляет только "свежую" сессию (session.freshAge,
		// по умолчанию 24ч с момента входа) — если сессия старше, вернёт ошибку
		// и требует пароль. У аккаунтов только через Google пароля нет — если у
		// них сессия не свежая, им остаётся выйти и зайти заново.
		const { error } = await authClient.deleteUser({
			password: password || undefined,
			callbackURL: ROUTES.login
		})
		setLoading(false)
		if (error) setError(error.message ?? t('auth.error.generic'))
		else router.push(ROUTES.login)
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger
				render={<Button variant="destructive" className="w-full h-11" />}
			>
				{t('account.delete')}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t('account.deleteTitle')}</AlertDialogTitle>
					<AlertDialogDescription>
						{t('account.deleteConfirm')}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-1.5">
					<Label htmlFor="delete-account-password">
						{t('account.deletePassword')}
					</Label>
					<Input
						id="delete-account-password"
						type="password"
						autoComplete="current-password"
						className="h-11 text-base"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<p className="text-xs text-muted-foreground">
						{t('account.deletePasswordHint')}
					</p>
				</div>
				{error && (
					<p className="text-sm text-destructive" role="alert">
						{error}
					</p>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						{t('common.cancel')}
					</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={loading}
						onClick={onDelete}
					>
						{loading ? '…' : t('account.delete')}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
