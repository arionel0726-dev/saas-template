import { subscriptions } from '@/db/schema'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { cancelLemonSqueezySubscription } from '@/lib/lemonsqueezy'
import { rateLimit, tooManyRequestsResponse } from '@/lib/rate-limit'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session)
		return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

	const limit = rateLimit(`cancel:${session.user.id}`, {
		windowMs: 60_000,
		max: 5
	})
	if (!limit.allowed) return tooManyRequestsResponse(limit.retryAfterMs)

	const [sub] = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.userId, session.user.id))
	if (!sub?.subscriptionId)
		return NextResponse.json({ error: 'no subscription' }, { status: 404 })

	const ok = await cancelLemonSqueezySubscription(sub.subscriptionId)
	if (!ok) return NextResponse.json({ error: 'cancel failed' }, { status: 502 })

	await db
		.update(subscriptions)
		.set({ status: 'cancelled' })
		.where(eq(subscriptions.id, sub.id))
	return NextResponse.json({ ok: true })
}
