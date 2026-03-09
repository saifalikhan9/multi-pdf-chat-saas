'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plus, MessageSquare, FileText, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navItems = [
    { icon: MessageSquare, label: 'New Chat', href: '/chat/new' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-sidebar-accent text-sidebar-foreground"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 z-40',
          isOpen ? 'w-64' : 'w-0 overflow-hidden',
          'md:w-64 md:static md:z-0',
          className
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <Link href="/" className="font-bold text-lg tracking-tight">
            PDFChat AI
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Link href="/chat/new">
            <Button
              className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground justify-center gap-2"
            >
              <Plus size={18} />
              New Chat
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}
    </>
  )
}
