## Быстрый старт (30 минут)

- [ ] `bun install`
- [ ] Neon: создать проект → скопировать pooled DATABASE_URL →
      `bunx drizzle-kit push`
- [ ] `cp .env.example .env.local` → заполнить
- [ ] Google OAuth: console.cloud.google.com → Credentials → redirect:
      `${BETTER_AUTH_URL}/api/auth/callback/google`
- [ ] Resend: добавить домен, прописать DKIM-записи (проверка займёт время —
      начните сразу)
- [ ] Lemon Squeezy: создать продукт+variant → webhook:
      `${SITE}/api/webhooks/lemonsqueezy` со всеми событиями
- [ ] `bun run dev` → проверить: регистрация, Google login, покупка (test mode),
      письмо из outbox
- [ ] Vercel: импорт репо → env vars → deploy
- [ ] Поменять в src/lib/routes.ts, SITE_NAME в layout, контент лендинга
