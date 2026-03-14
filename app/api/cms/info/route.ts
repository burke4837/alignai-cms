import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'

export async function GET() {
  try {
    const info = await ModernCMS.getAllInfo()
    return NextResponse.json(info)
  } catch (error: any) {
    console.error('Info API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch info',
      details: error.message || 'Unknown error'
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
