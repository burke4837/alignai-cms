import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL?.trim()

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createUnavailablePrismaClient(message: string): PrismaClient {
  console.error(message)
  return new Proxy(
    {},
    {
      get() {
        throw new Error(message)
      },
    }
  ) as PrismaClient
}

function createPrismaClient(): PrismaClient {
  const missingEnvMessage =
    'Prisma Client: DATABASE_URL is not set. Create a .env.local file with a valid PostgreSQL connection string.'

  if (!connectionString) {
    return createUnavailablePrismaClient(missingEnvMessage)
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(connectionString)
  } catch {
    return createUnavailablePrismaClient('Prisma Client: DATABASE_URL is not a valid URL.')
  }

  if (!parsedUrl.protocol.startsWith('postgres')) {
    return createUnavailablePrismaClient(
      'Prisma Client: DATABASE_URL must use a postgres:// or postgresql:// scheme.'
    )
  }

  console.log('Prisma Client: Initializing with DB host:', parsedUrl.host)

  const pool = new Pool({
    connectionString,
    ssl: parsedUrl.hostname.includes('neon.tech') ? { rejectUnauthorized: false } : false,
  })
  const adapter = new PrismaPg(pool as any)
  return new PrismaClient({ adapter: adapter as any })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
