import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'

export async function GET() {
  try {
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
