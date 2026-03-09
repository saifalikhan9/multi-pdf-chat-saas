import Link from 'next/link'
import { Button } from '../ui/button'

export const Navbar = () => {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="font-bold text-2xl text-foreground">PDFChat AI</div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/chat/new">
            <Button>Start Chatting</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
