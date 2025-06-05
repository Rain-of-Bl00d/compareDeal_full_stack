import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
          Welcome to CompareDeals
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
          Discover amazing products from top brands. Shop electronics, fashion, groceries and more!
        </p>
        <Button
          size="lg"
          asChild
          className="bg-white text-blue-600 hover:bg-white/90 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 h-auto"
        >
          <Link href="#categories">Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}
