import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { LinkButton } from '@/components/ui/link-button'
import { getT } from '@/i18n/server'
import { auth } from '@/lib/auth'
import { ROUTES } from '@/lib/routes'
import { headers } from 'next/headers'
import Link from 'next/link'
import { ResendVerificationForm } from './resend-verification-form'

export default async function VerifyEmailPage({
	searchParams
}: {
	searchParams: Promise<{ error?: string; email?: string }>
}) {
	const { error, email } = await searchParams
	const { t } = await getT()
	// autoSignInAfterVerification (src/lib/auth.ts) создаёт сессию сразу после
	// перехода по ссылке из письма — наличие сессии здесь и означает успех
	const session = await auth.api.getSession({ headers: await headers() })

	const verified = !!session && !error

	return (
		<Card className="w-full shadow-xl">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl text-center">
					{t('auth.verifyEmail.title')}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				{verified ? (
					<div className="grid gap-4">
						<p className="text-sm text-muted-foreground text-center">
							{t('auth.verifyEmail.success')}
						</p>
						<LinkButton href={ROUTES.afterLogin} className="w-full h-11">
							{t('nav.dashboard')}
						</LinkButton>
					</div>
				) : (
					<div className="grid gap-4">
						<p className="text-sm text-muted-foreground text-center">
							{error
								? t('auth.verifyEmail.error')
								: t('auth.verifyEmail.pending')}
						</p>
						<ResendVerificationForm initialEmail={email} />
					</div>
				)}
			</CardContent>
			<CardFooter className="justify-center">
				<p className="text-sm text-muted-foreground">
					<Link href={ROUTES.login} className="text-primary hover:underline">
						{t('auth.login.title')}
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
