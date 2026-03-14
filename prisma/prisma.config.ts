import { PrismaConfig } from '@prisma/config'

const config: PrismaConfig = {
  schema: './prisma/schema.prisma',
  datasource: {
    name: 'db',
    url: process.env.DATABASE_URL!,
  },
}

export default config
