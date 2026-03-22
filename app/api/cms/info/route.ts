import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'

export async function GET() {
  try {
    const hasDatabase = Boolean(process.env.DATABASE_URL?.trim())
    if (!hasDatabase) {
      return NextResponse.json([])
    }

    console.log('GET /api/cms/info - Fetching all info...')
    const info = await ModernCMS.getAllInfo()
    console.log(`GET /api/cms/info - Successfully fetched ${info.length} info items.`)
    return NextResponse.json(info)
  } catch (error: any) {
    console.error('Info API GET error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({ 
      error: 'Failed to fetch info',
      details: error.message || 'Unknown error',
      code: error.code
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newInfo = await ModernCMS.createInfo(body)
    return NextResponse.json(newInfo, { status: 201 })
  } catch (error: any) {
    console.error('Create info error:', error)
    return NextResponse.json({ 
      error: 'Failed to create info',
      details: error.message || 'Unknown error'
    }, { status: 500 })
  }
}
