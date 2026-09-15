import { NextResponse } from 'next/server'

/**
 * Простой sliding-window rate limiter в памяти процесса — без внешних
 * сервисов и переменных окружения.
 *
 * ОГРАНИЧЕНИЕ: счётчик живёт в памяти одного инстанса. На serverless с
 * несколькими одновременными инстансами (например, Vercel) каждый инстанс
 * считает независимо — реальный лимит на пользователя может оказаться в
 * N раз больше настроенного, где N — число активных инстансов. Если это
 * станет проблемой (пойдут жалобы на злоупотребления или нужен точный
 * общий лимит), путь апгрейда — Upstash Redis (INCR+EXPIRE или их
 * sliding-window helper) за тем же интерфейсом rateLimit() ниже.
 */

type Bucket = number[] // таймстемпы (мс) запросов внутри текущего окна

const buckets = new Map<string, Bucket>()

// грубая защита от неограниченного роста Map на долгоживущем процессе
const MAX_TRACKED_KEYS = 5000

export type RateLimitResult = {
	allowed: boolean
	remaining: number
	retryAfterMs: number
}

export function rateLimit(
	key: string,
	{ windowMs, max }: { windowMs: number; max: number }
): RateLimitResult {
	const now = Date.now()
	const windowStart = now - windowMs

	let bucket = buckets.get(key)
	if (!bucket) {
		bucket = []
		buckets.set(key, bucket)
	}

	while (bucket.length > 0 && bucket[0]! < windowStart) bucket.shift()

	if (bucket.length >= max) {
		return {
			allowed: false,
			remaining: 0,
			retryAfterMs: bucket[0]! + windowMs - now
		}
	}

	bucket.push(now)

	if (buckets.size > MAX_TRACKED_KEYS) {
		for (const [k, b] of buckets) {
			const trimmed = b.filter(t => t >= windowStart)
			if (trimmed.length === 0) buckets.delete(k)
			else buckets.set(k, trimmed)
		}
	}

	return { allowed: true, remaining: max - bucket.length, retryAfterMs: 0 }
}

// Ключ по IP (из заголовков прокси) и опциональному суффиксу (например,
// userId сессии) — чтобы лимитировать и анонимов, и залогиненных отдельно.
export function clientKey(req: Request, extra?: string): string {
	const ip =
		req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
		req.headers.get('x-real-ip') ??
		'unknown'
	return extra ? `${ip}:${extra}` : ip
}

export function tooManyRequestsResponse(retryAfterMs: number) {
	return NextResponse.json(
		{ error: 'too many requests' },
		{
			status: 429,
			headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) }
		}
	)
}
