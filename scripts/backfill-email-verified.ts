// Разовый скрипт для миграции на requireEmailVerification: true (см. src/lib/auth.ts).
//
// До этого изменения верификация email была выключена, и все существующие
// пользователи имеют email_verified = false. Если включить
// requireEmailVerification без этого шага, все они потеряют возможность
// войти по email+паролю (better-auth будет требовать подтверждённый email
// на каждый вход). Google-логин не затронут — better-auth считает email
// из OAuth уже подтверждённым.
//
// Запустить ОДИН РАЗ перед деплоем/сразу при деплое апдейта:
//   bun run db:backfill-email-verified
//
// Задним числом помечает подтверждёнными только тех, кто уже
// зарегистрирован (появившихся до момента запуска скрипта) — все новые
// регистрации после включения флага обязаны пройти верификацию как обычно.
import { user } from '@/db/auth-schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

async function main() {
	const result = await db
		.update(user)
		.set({ emailVerified: true })
		.where(eq(user.emailVerified, false))
		.returning({ id: user.id })

	console.log(`Backfilled emailVerified=true for ${result.length} existing user(s).`)
	process.exit(0)
}

main().catch(e => {
	console.error(e)
	process.exit(1)
})
