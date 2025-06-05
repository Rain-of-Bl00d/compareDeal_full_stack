import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to CompareDeals
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover amazing products from top brands. Shop electronics, fashion, groceries and more!
        </p>
        <Button
          size="lg"
          asChild
          className="bg-white text-blue-600 hover:bg-white/90 text-base md:text-lg px-6 md:px-8 py-2 md:py-3"
        >
          <Link href="#categories">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
