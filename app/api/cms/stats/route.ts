import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'
import { CustomCMS } from '@/lib/cms-db'

export async function GET() {
  try {
    const hasDatabase = Boolean(process.env.DATABASE_URL?.trim())
    if (!hasDatabase) {
      const customStats = await CustomCMS.getStats()
      return NextResponse.json({
        totalContents: customStats.totalPosts,
        publishedContents: customStats.publishedPosts,
        draftContents: customStats.draftPosts,
        totalPages: 0,
        publishedPages: 0,
        draftPages: 0,
        totalCategories: customStats.totalCategories,
        totalUsers: 0,
      })
    }

    console.log('GET /api/cms/stats - Fetching statistics...')
    const stats = await ModernCMS.getStats()
    console.log('GET /api/cms/stats - Successfully fetched statistics.')
    return NextResponse.json(stats)
  } catch (error: any) {
    console.error('Stats API GET error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({ 
      error: 'Failed to fetch statistics',
      details: error.message || 'Unknown error',
      code: error.code
    }, { status: 500 })
  }
}
