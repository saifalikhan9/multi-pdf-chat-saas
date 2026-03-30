"use client"
import { WobbleCard } from '../ui/wobble-card'

export const Feature = () => {
  return (
    <section className="max-w-7xl mx-auto px-20 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full text-black">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-primary/50 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            Chat with PDFs
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Ask complex questions to your documents and get context-aware
            responses instantly using advanced neural retrieval.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-secondary/50">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
          Smart Retrieval
          </h2>
          <p className="mt-4 max-w-104 text-left  text-base/6 text-neutral-200">
          Pinpoint exact information within thousands of pages with 99.9%
          semantic accuracy across various data structures.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-accent/50 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            AI MCQ Generator
            </h2>
            <p className="mt-4 max-w-104 text-left  text-base/6 text-neutral-200">
            Automatically generate comprehensive multiple-choice questions to test
            your knowledge retention and understanding.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        
      </div>
    </section>
  )
}


