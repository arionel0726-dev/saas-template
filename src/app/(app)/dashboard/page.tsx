import { CancelSubscriptionButton } from '@/components/buttons/cancel-subscription-button'
import { DeleteAccountButton } from '@/components/buttons/delete-account-button'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { subscriptions } from '@/db/schema'
import { getT } from '@/i18n/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { listLemonSqueezyOrders } from '@/lib/lemonsqueezy'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function DashboardPage() {
	const { t, locale } = await getT()
	const session = await auth.api.getSession({ headers: await headers() })
	const [sub] = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.userId, session!.user.id))

	const orders = sub?.customerId
		? await listLemonSqueezyOrders(sub.customerId)
		: []

	return (
		<div className="grid gap-4 max-w-2xl mx-auto">
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">{t('nav.dashboard')}</CardTitle>
					<CardDescription>
						{session!.user.name || session!.user.email}
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle>{t('price.title')}</CardTitle>
				</CardHeader>
				<CardContent>
					{sub && sub.status === 'active' ? (
						<div className="grid gap-4">
							<p className="text-sm text-muted-foreground capitalize">
								{sub.plan}
							</p>
							<CancelSubscriptionButton />
						</div>
					) : (
						<Button
							nativeButton={false}
							render={<Link href="/price" />}
							className="w-full h-11"
						>
							{t('price.choose')}
						</Button>
					)}
				</CardContent>
			</Card>

			{sub?.customerId && (
				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle>{t('billing.history.title')}</CardTitle>
					</CardHeader>
					<CardContent>
						{orders.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								{t('billing.history.empty')}
							</p>
						) : (
							<ul className="grid gap-3">
								{orders.map(order => (
									<li
										key={order.id}
										className="flex items-center justify-between gap-3 text-sm"
									>
										<div className="grid">
											<span>
												{new Date(order.createdAt).toLocaleDateString(locale)}
											</span>
											<span className="text-muted-foreground capitalize">
												{order.statusFormatted}
											</span>
										</div>
										<div className="flex items-center gap-3">
											<span className="font-medium">{order.total}</span>
											{order.receiptUrl && (
												<a
													href={order.receiptUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-primary hover:underline"
												>
													{t('billing.history.receipt')}
												</a>
											)}
										</div>
									</li>
								))}
							</ul>
						)}
					</CardContent>
				</Card>
			)}

			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle>{t('account.delete')}</CardTitle>
				</CardHeader>
				<CardContent>
					<DeleteAccountButton />
				</CardContent>
			</Card>
		</div>
	)
}
