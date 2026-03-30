import { Navbar } from '@/components/common/Navbar'
import { Hero } from '@/components/landings/Hero'
import { Feature } from '@/components/landings/Feature'
import { Footer } from '@/components/common/Footer'

export default function Home() {
  return (
    <div
      className="min-h-screen bg-radial from-[#2C0051] via-[#10001e] to-[#000000]">
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <Hero />
        <Feature />
        <Footer />
      </div>
    </div>
  )
}
