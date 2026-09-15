// Простой allowlist админ-доступа без полноценных ролей: сверяем
// session.user.email со списком из ADMIN_EMAILS (через запятую).
export function isAdminEmail(email: string | null | undefined): boolean {
	if (!email) return false
	const allowlist = (process.env.ADMIN_EMAILS ?? '')
		.split(',')
		.map(e => e.trim().toLowerCase())
		.filter(Boolean)
	return allowlist.includes(email.toLowerCase())
}
