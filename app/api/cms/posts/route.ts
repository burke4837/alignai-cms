import { NextResponse } from 'next/server'
import { ModernCMS } from '@/lib/modern-cms'
import { CustomCMS } from '@/lib/cms-db'

export async function GET(request: Request) {
  try {
    const hasDatabase = Boolean(process.env.DATABASE_URL?.trim())
    if (!hasDatabase) {
      const posts = await CustomCMS.getPosts()
      return NextResponse.json({ posts })
    }

    console.log('GET /api/cms/posts - Parsing query parameters...')
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const take = searchParams.get('take')

    const filters: any = {}
    if (type) filters.type = type
    if (status) filters.status = status
    if (featured === 'true') filters.featured = true
    
    // Convert take to number if present
    const options: any = { ...filters }
    if (take) options.take = parseInt(take)

    console.log('GET /api/cms/posts - Fetching contents with options:', options)
    const posts = await ModernCMS.getContents(options)
    console.log(`GET /api/cms/posts - Successfully fetched ${posts.length} posts.`)

    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error('Posts API GET error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json({ 
      error: 'Failed to fetch content',
      details: error.message || 'Unknown error',
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, author, publishedAt, featured, status } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newPost = await ModernCMS.createContent({
      title,
      slug,
      excerpt,
      content,
      type: body.type || 'BLOG_POST',
      status: status || 'DRAFT',
      featured: featured || false,
      authorId: author, // Mapping author to authorId
    })

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error: any) {
    console.error('Create post error:', error)
    return NextResponse.json({ 
      error: 'Failed to create post',
      details: error.message || 'Unknown error'
    }, { status: 500 })
  }
}
