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

      <main className="container mx-auto px-4 py-8">
        <CategorySection />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
