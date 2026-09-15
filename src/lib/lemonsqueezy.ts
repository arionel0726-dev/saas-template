import { createHmac, timingSafeEqual } from 'crypto'

// Проверка подписи вебхука Lemon Squeezy (заголовок x-signature — HMAC-SHA256
// от сырого тела запроса на LEMONSQUEEZY_WEBHOOK_SECRET), см.
// src/app/api/webhooks/lemonsqueezy/route.ts
export function verifyLemonSqueezySignature(
	rawBody: string,
	signature: string,
	secret: string
): boolean {
	const digest = createHmac('sha256', secret).update(rawBody).digest('hex')
	const a = Buffer.from(signature)
	const b = Buffer.from(digest)
	if (a.length !== b.length) return false
	return timingSafeEqual(a, b)
}

export type LemonSqueezyOrder = {
	id: string
	orderNumber: number
	total: string
	status: string
	statusFormatted: string
	createdAt: string
	receiptUrl: string | null
}

type LemonSqueezyOrdersResponse = {
	data: Array<{
		id: string
		attributes: {
			order_number: number
			total_formatted: string
			status: string
			status_formatted: string
			created_at: string
			urls?: { receipt?: string }
		}
	}>
}

// История платежей для дашборда: заказы клиента в Lemon Squeezy,
// см. https://docs.lemonsqueezy.com/api/orders/list-all-orders
export async function listLemonSqueezyOrders(
	customerId: string
): Promise<LemonSqueezyOrder[]> {
	const url = new URL('https://api.lemonsqueezy.com/v1/orders')
	url.searchParams.set('filter[customer_id]', customerId)
	url.searchParams.set('page[size]', '20')

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
			Accept: 'application/vnd.api+json'
		}
	})
	if (!res.ok) return []

	const json = (await res.json()) as LemonSqueezyOrdersResponse
	return (json.data ?? []).map(o => ({
		id: o.id,
		orderNumber: o.attributes.order_number,
		total: o.attributes.total_formatted,
		status: o.attributes.status,
		statusFormatted: o.attributes.status_formatted,
		createdAt: o.attributes.created_at,
		receiptUrl: o.attributes.urls?.receipt ?? null
	}))
}

export async function cancelLemonSqueezySubscription(subscriptionId: string) {
	const res = await fetch(
		`https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
				Accept: 'application/vnd.api+json'
			}
		}
	)
	return res.ok
}
