import { captureError } from '@/lib/capture-error'
import { clientKey, rateLimit, tooManyRequestsResponse } from '@/lib/rate-limit'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	// анонимный эндпоинт (клиентский error-репортинг) — лимитируем по IP,
	// чтобы им нельзя было засыпать таблицу errors
	const limit = rateLimit(clientKey(req, 'errors'), {
		windowMs: 60_000,
		max: 20
	})
	if (!limit.allowed) return tooManyRequestsResponse(limit.retryAfterMs)

	const { message, url } = await req.json().catch(() => ({}))
	if (!message) return NextResponse.json({ ok: false }, { status: 400 })
	await captureError(new Error(String(message).slice(0, 500)), {
		source: 'client',
		url: url ? String(url).slice(0, 500) : undefined
	})
	return NextResponse.json({ ok: true })
}
