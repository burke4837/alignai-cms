import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'

export async function GET() {
  try {
    const stats = await ModernCMS.getStats()
    return NextResponse.json(stats)
  } catch (error: any) {
    console.error('Stats API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch statistics',
      details: error.message || 'Unknown error',
      code: error.code
    }, { status: 500 })
  }
}
