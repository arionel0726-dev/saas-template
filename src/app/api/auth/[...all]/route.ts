import { auth } from '@/lib/auth'
export const { GET, POST } = auth.handler
	? { GET: auth.handler, POST: auth.handler }
	: {}
