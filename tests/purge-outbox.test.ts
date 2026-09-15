import { beforeEach, describe, expect, it, vi } from 'vitest'

const returning = vi.fn()
const where = vi.fn(() => ({ returning }))
const deleteFn = vi.fn(() => ({ where }))

vi.mock('@/lib/db', () => ({
	db: { delete: deleteFn }
}))

const { purgeOutbox } = await import('@/lib/email')

describe('purgeOutbox', () => {
	beforeEach(() => {
		deleteFn.mockClear()
		where.mockClear()
		returning.mockReset()
	})

	it('deletes sent emails older than the cutoff and returns the count', async () => {
		returning.mockResolvedValue([{ id: 'a' }, { id: 'b' }])
		const deleted = await purgeOutbox(30)
		expect(deleted).toBe(2)
		expect(deleteFn).toHaveBeenCalledTimes(1)
		expect(where).toHaveBeenCalledTimes(1)
	})

	it('returns 0 when nothing matches', async () => {
		returning.mockResolvedValue([])
		const deleted = await purgeOutbox(30)
		expect(deleted).toBe(0)
	})
})
