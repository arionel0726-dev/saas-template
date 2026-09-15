import type { NextConfig } from 'next'

// CSP без nonce: headers() в next.config.ts не может подставлять nonce per-request
// (для этого нужен middleware), поэтому script-src/style-src держим на 'unsafe-inline' —
// это ослабляет защиту от XSS через инлайн-скрипты, но не требует правки рендер-пайплайна.
// Если понадобится ужесточить — переносить генерацию CSP в middleware.ts с nonce.
//
// В dev дополнительно разрешаем 'unsafe-eval' и websocket-соединение с самим
// собой — без этого Turbopack HMR и React dev-инструменты (которым нужен eval())
// ломаются с ошибкой "eval() is not supported". На prod-сборке eval не нужен.
const isDev = process.env.NODE_ENV !== 'production'

const CSP = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https:",
	"font-src 'self' data:",
	`connect-src 'self' https://api.lemonsqueezy.com${isDev ? ' ws:' : ''}`,
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'"
].join('; ')

const securityHeaders = [
	{ key: 'Content-Security-Policy', value: CSP },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	}
]

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	output: process.env.VERCEL ? undefined : 'standalone',
	async headers() {
		return [{ source: '/:path*', headers: securityHeaders }]
	}
}

export default nextConfig
