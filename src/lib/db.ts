import * as authSchema from '@/db/auth-schema'
import * as schema from '@/db/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema: { ...schema, ...authSchema } })
