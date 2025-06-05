import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { CategorySection } from "@/components/category-section"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />

      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <CategorySection />

        <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
            Featured Products
          </h2>
          <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
