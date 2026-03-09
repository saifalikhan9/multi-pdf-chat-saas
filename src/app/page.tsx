import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload, MessageSquare, Zap } from 'lucide-react'
import { Navbar } from '@/components/common/Navbar'
import { Hero } from '@/components/landings/Hero'
import { Feature } from '@/components/landings/Feature'
import { CTA } from '@/components/landings/CTA'
import { Footer } from '@/components/landings/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className='max-w-7xl mx-auto'>

      <Navbar />
      <Hero />
      <Feature />
      <CTA />
      <Footer />
      </div>
    </div>
  )
}
