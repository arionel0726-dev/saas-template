import { clientKey, rateLimit } from '@/lib/rate-limit'
import { describe, expect, it } from 'vitest'

describe('rateLimit', () => {
	it('allows requests up to max within the window', () => {
		const key = `test:${crypto.randomUUID()}`
		for (let i = 0; i < 3; i++) {
			const result = rateLimit(key, { windowMs: 10_000, max: 3 })
			expect(result.allowed).toBe(true)
		}
	})

	it('blocks the request once max is exceeded', () => {
		const key = `test:${crypto.randomUUID()}`
		for (let i = 0; i < 3; i++) rateLimit(key, { windowMs: 10_000, max: 3 })
		const blocked = rateLimit(key, { windowMs: 10_000, max: 3 })
		expect(blocked.allowed).toBe(false)
		expect(blocked.remaining).toBe(0)
		expect(blocked.retryAfterMs).toBeGreaterThan(0)
	})

	it('tracks independent keys separately', () => {
		const keyA = `test:${crypto.randomUUID()}`
		const keyB = `test:${crypto.randomUUID()}`
		rateLimit(keyA, { windowMs: 10_000, max: 1 })
		const resultA = rateLimit(keyA, { windowMs: 10_000, max: 1 })
		const resultB = rateLimit(keyB, { windowMs: 10_000, max: 1 })
		expect(resultA.allowed).toBe(false)
		expect(resultB.allowed).toBe(true)
	})

	it('allows requests again once the window has elapsed', async () => {
		const key = `test:${crypto.randomUUID()}`
		expect(rateLimit(key, { windowMs: 50, max: 1 }).allowed).toBe(true)
		expect(rateLimit(key, { windowMs: 50, max: 1 }).allowed).toBe(false)
		await new Promise(resolve => setTimeout(resolve, 70))
		expect(rateLimit(key, { windowMs: 50, max: 1 }).allowed).toBe(true)
	})
})

describe('clientKey', () => {
	it('uses the first IP from x-forwarded-for', () => {
		const req = new Request('https://example.com', {
			headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' }
		})
		expect(clientKey(req)).toBe('1.2.3.4')
	})

	it('falls back to "unknown" when no IP header is present', () => {
		const req = new Request('https://example.com')
		expect(clientKey(req)).toBe('unknown')
	})

	it('appends the extra suffix when provided', () => {
		const req = new Request('https://example.com', {
			headers: { 'x-forwarded-for': '1.2.3.4' }
		})
		expect(clientKey(req, 'checkout:user-1')).toBe('1.2.3.4:checkout:user-1')
	})
})
