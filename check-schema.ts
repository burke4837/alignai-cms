import { prisma } from './lib/prisma'

async function check() {
  try {
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `
    console.log('Tables in DB:')
    console.table(result)
  } catch (error) {
    console.error('Error checking schema:', error)
  } finally {
    await prisma.$disconnect()
  }
}

check()
