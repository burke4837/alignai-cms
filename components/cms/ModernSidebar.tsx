"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, FileText, Grid3x3, Info, Settings, Users, LogOut } from 'lucide-react'

const navigation = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
    children: [
      { title: 'Blog Posts', href: '/admin/content/blog' },
      { title: 'Articles', href: '/admin/content/articles' },
      { title: 'News', href: '/admin/content/news' },
      { title: 'Case Studies', href: '/admin/content/case-studies' },
    ]
  },
  {
    title: 'Pages',
    href: '/admin/pages',
    icon: Grid3x3,
    children: [
      { title: 'Home', href: '/admin/pages/home' },
      { title: 'About', href: '/admin/pages/about' },
      { title: 'Framework', href: '/admin/pages/framework' },
      { title: 'Services', href: '/admin/pages/services' },
      { title: 'Contact', href: '/admin/pages/contact' },
    ]
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: Menu,
  },
  {
    title: 'Info',
    href: '/admin/info',
    icon: Info,
    children: [
      { title: 'Contact', href: '/admin/info/contact' },
      { title: 'Social', href: '/admin/info/social' },
      { title: 'Legal', href: '/admin/info/legal' },
      { title: 'Settings', href: '/admin/info/settings' },
    ]
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)


  const NavItem = ({ item, level = 0 }: { item: any; level?: number }) => {
    const isActive = pathname === item.href
    const hasChildren = item.children && item.children.length > 0

    return (
      <div>
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            level === 0 && 'h-12',
            isActive
              ? 'bg-cyan text-navy'
              : 'text-slate hover:bg-navy hover:text-white',
            level === 1 && 'ml-6 h-10'
          )}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.title}
        </Link>
        {hasChildren && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((child: any, index: number) => (
              <NavItem key={index} item={child} level={1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full w-64 flex-col bg-navy border-r border-mid-blue">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-mid-blue px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-cyan flex items-center justify-center">
            <span className="text-navy font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">AlignAI</h1>
            <p className="text-xs text-slate">CMS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-2">
          {navigation.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="border-t border-mid-blue p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-deep-blue flex items-center justify-center">
            <span className="text-xs text-light-slate">
              A
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-slate truncate">
              admin@alignai.com
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start text-slate hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="md:hidden fixed top-4 left-4 z-50 bg-navy border border-mid-blue">
          <Menu className="h-4 w-4 text-light-slate" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-navy">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
