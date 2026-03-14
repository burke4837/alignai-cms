// Custom CMS Database Layer
// Simple JSON file-based storage for development
// In production, replace with PostgreSQL/MySQL

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  featured: boolean
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
}

// Mock data - in production this would come from a database
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Why AI Governance Matters Now',
    slug: 'why-ai-governance-matters-now',
    excerpt: 'With the EU AI Act taking effect and enterprise AI adoption accelerating, the window for proactive governance is closing.',
    content: `Enterprise AI adoption has moved from experimentation to production at unprecedented speed. Yet governance structures have not kept pace.

The EU AI Act, effective in stages through 2026, introduces mandatory requirements for high-risk AI systems including transparency obligations, human oversight mandates, and conformity assessments.

Organizations that wait for enforcement to begin their governance journey face significant risks: regulatory penalties, reputational damage, and operational disruption.`,
    category: 'Governance',
    author: 'Brian Burke',
    publishedAt: '2026-03-12',
    featured: true,
    status: 'published',
    createdAt: '2026-03-12T00:00:00Z',
    updatedAt: '2026-03-12T00:00:00Z'
  },
  {
    id: '2',
    title: 'The AI Decision Visibility Assessment Explained',
    slug: 'decision-visibility-assessment-explained',
    excerpt: 'Our signature assessment helps organizations understand how AI decisions are made, documented, and communicated.',
    content: `The AI Decision Visibility Assessment (DVA) is a structured evaluation methodology designed to answer a fundamental question: can your organization explain how its AI systems make decisions?

The assessment examines four dimensions:

**Technical Transparency** — Can the model's decision logic be articulated? Are feature importances, confidence levels, and decision boundaries documented?`,
    category: 'Assessment',
    author: 'Brian Burke',
    publishedAt: '2026-03-11',
    featured: false,
    status: 'published',
    createdAt: '2026-03-11T00:00:00Z',
    updatedAt: '2026-03-11T00:00:00Z'
  }
]

const mockCategories: Category[] = [
  { id: '1', name: 'Governance', description: 'AI governance frameworks and implementation', createdAt: '2026-03-01T00:00:00Z' },
  { id: '2', name: 'Assessment', description: 'AI governance assessments and evaluations', createdAt: '2026-03-01T00:00:00Z' },
  { id: '3', name: 'Strategy', description: 'Strategic approaches to AI governance', createdAt: '2026-03-01T00:00:00Z' },
  { id: '4', name: 'Compliance', description: 'Regulatory compliance and requirements', createdAt: '2026-03-01T00:00:00Z' },
  { id: '5', name: 'Industry', description: 'Industry-specific AI governance insights', createdAt: '2026-03-01T00:00:00Z' }
]

// In-memory storage (replace with database in production)
let posts = [...mockPosts]
let categories = [...mockCategories]

// Custom CMS Database API
export class CustomCMS {
  // Posts
  static async getPosts(filters?: {
    category?: string
    status?: 'draft' | 'published'
    featured?: boolean
  }): Promise<Post[]> {
    let filteredPosts = posts

    if (filters?.category) {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category)
    }
    if (filters?.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status)
    }
    if (filters?.featured) {
      filteredPosts = filteredPosts.filter(post => post.featured)
    }

    return filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  static async getPost(slug: string): Promise<Post | null> {
    return posts.find(post => post.slug === slug) || null
  }

  static async createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    posts.push(newPost)
    return newPost
  }

  static async updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post | null> {
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) return null

    posts[index] = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString()
    }

    return posts[index]
  }

  static async deletePost(id: string): Promise<boolean> {
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) return false

    posts.splice(index, 1)
    return true
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    return categories
  }

  static async createCategory(data: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    const newCategory: Category = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }

    categories.push(newCategory)
    return newCategory
  }

  static async updateCategory(id: string, data: Partial<Omit<Category, 'id' | 'createdAt'>>): Promise<Category | null> {
    const index = categories.findIndex(cat => cat.id === id)
    if (index === -1) return null

    categories[index] = { ...categories[index], ...data }
    return categories[index]
  }

  static async deleteCategory(id: string): Promise<boolean> {
    const index = categories.findIndex(cat => cat.id === id)
    if (index === -1) return false

    categories.splice(index, 1)
    return true
  }

  // Utility methods
  static async getStats() {
    const allPosts = await this.getPosts()
    return {
      totalPosts: allPosts.length,
      publishedPosts: allPosts.filter(p => p.status === 'published').length,
      draftPosts: allPosts.filter(p => p.status === 'draft').length,
      featuredPosts: allPosts.filter(p => p.featured).length,
      totalCategories: categories.length
    }
  }
}
