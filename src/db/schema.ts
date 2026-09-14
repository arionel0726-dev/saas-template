// import {
// 	boolean,
// 	integer,
// 	pgEnum,
// 	pgTable,
// 	text,
// 	timestamp,
// 	uniqueIndex,
// 	uuid
// } from 'drizzle-orm/pg-core'
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
export const postStatusEnum = pgEnum('post_status', [
	'pending',
	'reviewing',
	'planned',
	'in_progress',
	'completed',
	'closed'
])

// Оплата (Lemon Squeezy)
export const subscriptions = pgTable('subscriptions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	provider: text('provider').notNull().default('lemonsqueezy'),
	customerId: text('customer_id'),
	subscriptionId: text('subscription_id').unique(),
	plan: text('plan').notNull().default('free'),
	status: text('status').notNull().default('active'),
	renewsAt: timestamp('renews_at'),
	endsAt: timestamp('ends_at')
})
