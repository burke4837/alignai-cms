import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'
import { CustomCMS } from '@/lib/cms-db'

export async function GET() {
  try {
    const hasDatabase = Boolean(process.env.DATABASE_URL?.trim())
    if (!hasDatabase) {
      const categories = await CustomCMS.getCategories()
      return NextResponse.json({ categories })
    }

    console.log('GET /api/cms/categories - Fetching categories...')
    const categories = await ModernCMS.getCategories()
    console.log(`GET /api/cms/categories - Successfully fetched ${categories.length} categories.`)
    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error('Categories API GET error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({ 
      error: 'Failed to fetch categories',
      details: error.message || 'Unknown error',
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, color, icon } = body

    const newCategory = await ModernCMS.createCategory({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      color,
      icon
    })

    return NextResponse.json({ category: newCategory }, { status: 201 })
  } catch (error: any) {
    console.error('Create category error:', error)
    return NextResponse.json({ 
      error: 'Failed to create category',
      details: error.message || 'Unknown error'
    }, { status: 500 })
  }
}
