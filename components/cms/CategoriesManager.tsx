"use client"

import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  description: string
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/cms/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/cms/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchCategories()
        setShowCreateForm(false)
        setFormData({ name: '', description: '' })
      }
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-light-slate">Loading categories...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Categories Management</h2>
          <p className="text-light-slate">Organize your content with categories</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-btn bg-mid-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan"
        >
          Create New Category
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="rounded-btn border border-mid-blue bg-deep-blue p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Create New Category</h3>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setFormData({ name: '', description: '' })
              }}
              className="text-light-slate hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-light-slate mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-slate mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-btn border border-light-slate bg-navy/50 px-4 py-2 text-white placeholder-light-slate focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                placeholder="Category description"
                rows={3}
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-btn bg-mid-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan"
              >
                Create Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false)
                  setFormData({ name: '', description: '' })
                }}
                className="rounded-btn border border-light-slate bg-transparent px-6 py-3 text-sm font-medium text-light-slate transition-colors hover:bg-navy"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="rounded-btn border border-mid-blue bg-deep-blue p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-light-slate mt-1">{category.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-cyan hover:text-white text-sm">
                  Edit
                </button>
                <button className="text-red-400 hover:text-red-300 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
