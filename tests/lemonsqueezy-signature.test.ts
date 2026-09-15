import { verifyLemonSqueezySignature } from '@/lib/lemonsqueezy'
import { createHmac } from 'crypto'
import { describe, expect, it } from 'vitest'

const secret = 'test-webhook-secret'

function sign(body: string, key = secret) {
	return createHmac('sha256', key).update(body).digest('hex')
}

describe('verifyLemonSqueezySignature', () => {
	it('accepts a correctly signed body', () => {
		const body = JSON.stringify({ meta: { event_name: 'subscription_created' } })
		expect(verifyLemonSqueezySignature(body, sign(body), secret)).toBe(true)
	})

	it('rejects a signature computed with the wrong secret', () => {
		const body = JSON.stringify({ meta: { event_name: 'subscription_created' } })
		expect(
			verifyLemonSqueezySignature(body, sign(body, 'wrong-secret'), secret)
		).toBe(false)
	})

	it('rejects when the body was tampered with after signing', () => {
		const original = JSON.stringify({ amount: 100 })
		const tampered = JSON.stringify({ amount: 1000000 })
		expect(
			verifyLemonSqueezySignature(tampered, sign(original), secret)
		).toBe(false)
	})

	it('rejects a malformed/short signature without throwing', () => {
		const body = JSON.stringify({ ok: true })
		expect(verifyLemonSqueezySignature(body, 'not-a-real-signature', secret)).toBe(
			false
		)
	})
})
