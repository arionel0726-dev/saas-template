import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { errors } from '@/db/schema'
import { getT } from '@/i18n/server'
import { isAdminEmail } from '@/lib/admin'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { ROUTES } from '@/lib/routes'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = { robots: { index: false, follow: false } }

export default async function ErrorsPage() {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session || !isAdminEmail(session.user.email)) redirect(ROUTES.afterLogin)

	const { t, locale } = await getT()
	const rows = await db
		.select()
		.from(errors)
		.orderBy(desc(errors.createdAt))
		.limit(100)

	return (
		<div className="grid gap-4 max-w-4xl mx-auto">
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl">{t('admin.errors.title')}</CardTitle>
				</CardHeader>
				<CardContent>
					{rows.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							{t('admin.errors.empty')}
						</p>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-muted-foreground border-b">
										<th className="py-2 pr-4">{t('admin.errors.date')}</th>
										<th className="py-2 pr-4">{t('admin.errors.source')}</th>
										<th className="py-2 pr-4">{t('admin.errors.message')}</th>
										<th className="py-2 pr-4">URL</th>
									</tr>
								</thead>
								<tbody>
									{rows.map(row => (
										<tr
											key={row.id}
											className="border-b last:border-0 align-top"
										>
											<td className="py-2 pr-4 whitespace-nowrap text-muted-foreground">
												{new Date(row.createdAt).toLocaleString(locale)}
											</td>
											<td className="py-2 pr-4">{row.source}</td>
											<td className="py-2 pr-4 max-w-md break-words">
												{row.message}
											</td>
											<td className="py-2 pr-4 max-w-xs break-words text-muted-foreground">
												{row.url}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
