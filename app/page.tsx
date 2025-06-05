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

      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <CategorySection />

        <div className="mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Featured Products</h2>
          <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
