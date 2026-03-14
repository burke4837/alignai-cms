"use client"

import { useState, useEffect } from 'react'

interface Post {
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
}

export default function DashboardOverview() {
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
    totalCategories: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch posts
      const postsResponse = await fetch('/api/cms/posts')
      const postsData = await postsResponse.json()
      setPosts(postsData.posts || [])

      // Calculate stats
      const calculatedStats = {
        totalPosts: postsData.posts?.length || 0,
        publishedPosts: postsData.posts?.filter((p: Post) => p.status === 'published').length || 0,
        draftPosts: postsData.posts?.filter((p: Post) => p.status === 'draft').length || 0,
        featuredPosts: postsData.posts?.filter((p: Post) => p.featured).length || 0,
        totalCategories: 5 // Fixed for now, can be fetched from API
      }
      setStats(calculatedStats)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const recentPosts = posts.slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-slate">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-light-slate">Manage your AlignAI content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-slate">Total Posts</p>
              <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </div>

        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-slate">Published</p>
              <p className="text-2xl font-bold text-white">{stats.publishedPosts}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-slate">Drafts</p>
              <p className="text-2xl font-bold text-white">{stats.draftPosts}</p>
            </div>
            <div className="text-3xl">📄</div>
          </div>
        </div>

        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-slate">Featured</p>
              <p className="text-2xl font-bold text-white">{stats.featuredPosts}</p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Posts</h3>
        <div className="rounded-btn border border-mid-blue bg-deep-blue overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-slate uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-slate uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-slate uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light-slate uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mid-blue">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-navy/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="rounded-btn bg-mid-blue px-2 py-1 text-xs font-medium text-white">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`rounded-btn px-2 py-1 text-xs font-medium ${
                      post.status === 'published' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-slate">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
