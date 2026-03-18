import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
if (connectionString === 'undefined' || !connectionString) {
  console.error('Prisma Client: DATABASE_URL is not defined in environment.')
} else {
  console.log('Prisma Client: Initializing with DB host:', connectionString.split('@')[1]?.split('/')[0])
}
const pool = new Pool({ 
  connectionString,
  ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : false
})
const adapter = new PrismaPg(pool as any)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: adapter as any })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
