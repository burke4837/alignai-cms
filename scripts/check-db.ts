import { prisma } from './lib/prisma'

async function checkData() {
  try {
    console.log('--- PAGES ---')
    const pages = await prisma.page.findMany()
    pages.forEach(p => {
      console.log(`- ${p.title} (${p.slug}): ${p.content.substring(0, 50)}...`)
      if (p.metadata) {
        console.log(`  Metadata keys: ${Object.keys(p.metadata as any).join(', ')}`)
      }
    })
    
    console.log('\n--- INFO ---')
    const info = await prisma.info.findMany()
    info.forEach(i => {
      console.log(`- ${i.type}: ${i.title}`)
    })

    console.log('\n--- CATEGORIES ---')
    const cats = await prisma.category.findMany()
    console.log(`Total categories: ${cats.length}`)
  } catch (error) {
    console.error('Error checking data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
