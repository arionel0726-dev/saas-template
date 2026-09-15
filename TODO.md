make db but if project will be hard use docker postgress if not use for start
supabase or neon

## Перед запуском: настрой редиректы

Все пути ниже — заглушки, замени на роуты своего приложения:

- [ ] `src/app/(auth)/login/page.tsx` и `register/page.tsx` —
      `router.push('/dashboard')` после входа/регистрации
- [ ] `src/app/(auth)/*/page.tsx` — `callbackURL: '/dashboard'` у Google sign-in
- [ ] `src/app/(app)/layout.tsx` — `redirect('/login')` (куда слать
      неавторизованных) и лого → `/dashboard`
- [ ] `src/components/buttons/sign-out-button.tsx` — `router.push('/login')`
      после выхода
- [ ] `src/app/price/page.tsx` — `href` тарифа Free (сейчас `/register`)
- [ ] `src/lib/routes.ts` — все ключевые редиректы приложения (после логина,
      логин, регистрация). Все остальные файлы берут пути отсюда.

## Перед первым деплоем после апдейта с 14 пунктами

- [ ] `bun run db:backfill-email-verified` — ОБЯЗАТЕЛЬНО перед (или в момент)
      деплоя. `requireEmailVerification` теперь включён в `src/lib/auth.ts`;
      без бэкфилла все существующие пользователи, зарегистрированные по
      email+паролю, не смогут войти. Google-логин не затронут. См. комментарий
      в `scripts/backfill-email-verified.ts`.
- [ ] `.env.example` → `.env.local` — добавь `ADMIN_EMAILS` (allowlist для
      `/dashboard/errors`), проверь остальные переменные.
- [ ] `/privacy` и `/terms` — шаблонный текст, согласуй с юристом перед
      реальным запуском.
