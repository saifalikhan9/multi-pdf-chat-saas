
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/sidebar'

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

export default function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background max-w-7xl mx-auto my-2">
      <Sidebar />
      <main
        className={cn(
          'flex-1 w-full overflow-auto md:ml-0',
          'pt-16 md:pt-0 px-4 md:px-8 py-6',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
