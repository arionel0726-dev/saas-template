// better Auth or next Auth.js
import * as authSchema from '@/db/auth-schema'
import { subscriptions } from '@/db/schema'
import { db } from '@/lib/db'
import { enqueueEmail } from '@/lib/email'
import { cancelLemonSqueezySubscription } from '@/lib/lemonsqueezy'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { eq } from 'drizzle-orm'

export const auth = betterAuth({
	appName: 'app-name',
	baseURL: process.env.BETTER_AUTH_URL!,
	secret: process.env.BETTER_AUTH_SECRET!,
	database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		// Resend подключён — верификация email обязательна для входа по паролю.
		// ВАЖНО: до этого флаг был выключен, поэтому у всех существующих
		// пользователей email_verified = false. Перед деплоем этого изменения
		// обязательно прогнать `bun run db:backfill-email-verified` — иначе
		// они все потеряют возможность войти. Google-логин не затронут.
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await enqueueEmail(user.email, 'reset', { url })
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await enqueueEmail(user.email, 'verify', { url })
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}
	},
	databaseHooks: {
		user: {
			create: {
				// welcome-письмо на любой способ регистрации (email+пароль или
				// Google) — не завязано на verify, чтобы не терять Google-юзеров,
				// у которых email уже подтверждён провайдером
				after: async user => {
					await enqueueEmail(user.email, 'welcome', { name: user.name })
				}
			}
		}
	},
	user: {
		deleteUser: {
			enabled: true,
			// подписки/сессии/аккаунты чистятся каскадом по userId (см. src/db/schema.ts,
			// src/db/auth-schema.ts), но активную подписку в Lemon Squeezy каскадом не
			// отменить — иначе пользователя продолжит списывать оплата без аккаунта в базе
			beforeDelete: async user => {
				const [sub] = await db
					.select()
					.from(subscriptions)
					.where(eq(subscriptions.userId, user.id))
				if (sub?.subscriptionId && sub.status === 'active') {
					await cancelLemonSqueezySubscription(sub.subscriptionId)
				}
			}
		}
	},
	trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!]
})
