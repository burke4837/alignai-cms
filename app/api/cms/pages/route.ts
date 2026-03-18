import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'

export async function GET() {
  try {
    console.log('GET /api/cms/pages - Fetching pages from DB...')
    const pages = await ModernCMS.getPages()
    console.log(`GET /api/cms/pages - Successfully fetched ${pages.length} pages.`)
    return NextResponse.json(pages)
  } catch (error: any) {
    console.error('Pages API GET error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({ 
      error: 'Failed to fetch pages',
      details: error.message || 'Unknown error',
      code: error.code
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newPage = await ModernCMS.createPage(body)
    return NextResponse.json(newPage, { status: 201 })
  } catch (error: any) {
    console.error('Create page error:', error)
    return NextResponse.json({ 
      error: 'Failed to create page',
      details: error.message || 'Unknown error'
    }, { status: 500 })
  }
}
