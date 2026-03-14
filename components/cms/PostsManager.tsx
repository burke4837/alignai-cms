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

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Governance',
    author: 'Brian Burke',
    publishedAt: new Date().toISOString().split('T')[0],
    featured: false,
    status: 'draft' as 'draft' | 'published'
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/cms/posts')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/cms/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchPosts()
        setShowCreateForm(false)
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: 'Governance',
          author: 'Brian Burke',
          publishedAt: new Date().toISOString().split('T')[0],
          featured: false,
          status: 'draft'
        })
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured,
      status: post.status
    })
    setShowCreateForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-slate">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Posts Management</h2>
          <p className="text-light-slate">Create and manage your blog posts</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-btn bg-mid-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan"
        >
          Create New Post
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h3>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setEditingPost(null)
                setFormData({
                  title: '',
                  excerpt: '',
                  content: '',
                  category: 'Governance',
                  author: 'Brian Burke',
                  publishedAt: new Date().toISOString().split('T')[0],
                  featured: false,
                  status: 'draft'
                })
              }}
              className="text-light-slate hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-slate mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-slate mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                >
                  <option value="Governance">Governance</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Industry">Industry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-slate mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                placeholder="Brief description of the post"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-slate mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                placeholder="Full post content"
                rows={8}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-slate mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-slate mb-2">
                  Published Date
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-slate mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-mid-blue bg-navy border-light-slate rounded focus:ring-cyan focus:ring-2"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-light-slate">
                Featured post
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-btn bg-mid-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan"
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingPost(null)
                }}
                className="rounded-btn border border-light-slate bg-transparent px-6 py-3 text-sm font-medium text-light-slate transition-colors hover:bg-navy"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Table */}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-light-slate uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mid-blue">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-navy/30">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-white">{post.title}</div>
                    <div className="text-xs text-light-slate">{post.excerpt}</div>
                  </div>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-cyan hover:text-white mr-4"
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
