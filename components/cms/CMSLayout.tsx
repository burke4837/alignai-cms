"use client"

import { ReactNode } from 'react'

interface CMSLayoutProps {
  activeTab: string
  onTabChange: (tab: string) => void
  children: ReactNode
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'posts', label: 'Posts', icon: '📝' },
  { id: 'categories', label: 'Categories', icon: '🏷️' },
]

export default function CMSLayout({ activeTab, onTabChange, children }: CMSLayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-deep-blue border-r border-mid-blue min-h-[calc(100vh-4rem)]">
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-btn px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-mid-blue text-white'
                      : 'text-light-slate hover:bg-navy hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-navy/50">
        <div className="container-main p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
