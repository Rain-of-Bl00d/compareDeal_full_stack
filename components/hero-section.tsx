import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Welcome to CompareDeals</h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover amazing products from top brands. Shop electronics, fashion, groceries and more!
        </p>
        <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-white/90">
          <Link href="#categories">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
