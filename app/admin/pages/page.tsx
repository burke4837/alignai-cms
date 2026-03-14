"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Sidebar } from '@/components/cms/ModernSidebar'

export default function PagesManager() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    template: 'default'
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages')
      const pagesData = await res.json()
      setPages(Array.isArray(pagesData) ? pagesData : [])
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        await fetchPages()
        setShowCreateDialog(false)
        setFormData({
          title: '',
          slug: '',
          content: '',
          template: 'default'
        })
      }
    } catch (error) {
      console.error('Failed to create page:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-navy">
        <div className="text-light-slate">Loading pages...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-navy">
      <Sidebar>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Pages</h1>
              <p className="text-slate">Manage your website pages</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-cyan text-navy hover:bg-cyan/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Page
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-deep-blue border-mid-blue">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Page</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-light-slate">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-navy border-mid-blue text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug" className="text-light-slate">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="bg-navy border-mid-blue text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-light-slate">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="bg-navy border-mid-blue text-white"
                      rows={8}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-cyan text-navy">
                      Create Page
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-deep-blue border-mid-blue">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate">Title</TableHead>
                    <TableHead className="text-slate">Slug</TableHead>
                    <TableHead className="text-slate">Template</TableHead>
                    <TableHead className="text-slate">Status</TableHead>
                    <TableHead className="text-slate">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id} className="border-mid-blue">
                      <TableCell className="text-white">{page.title}</TableCell>
                      <TableCell className="text-slate">{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {page.template}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={page.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  )
}
