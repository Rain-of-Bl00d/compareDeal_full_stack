import Link from "next/link"
import { Laptop, Smartphone, ShoppingCart, Home, Shirt, Sparkles } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    href: "/?category=electronics",
    icon: <Laptop className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-blue-100",
  },
  {
    name: "Mobile & Laptop",
    href: "/?category=mobile-laptop",
    icon: <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-purple-100",
  },
  {
    name: "Fashion",
    href: "/?category=fashion",
    icon: <Shirt className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-pink-100",
  },
  {
    name: "Grocery",
    href: "/?category=grocery",
    icon: <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-green-100",
  },
  {
    name: "Skin Care",
    href: "/?category=skin-care",
    icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-yellow-100",
  },
  {
    name: "Home & Kitchen",
    href: "/?category=home-kitchen",
    icon: <Home className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />,
    color: "bg-red-100",
  },
]

export function CategorySection() {
  return (
    <section id="categories" className="py-6 sm:py-8 md:py-10 lg:py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105 group min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"
          >
            <div
              className={`rounded-full ${category.color} p-2.5 sm:p-3 md:p-3.5 lg:p-4 mb-2 sm:mb-3 group-hover:scale-110 transition-transform flex-shrink-0`}
            >
              {category.icon}
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-center leading-tight line-clamp-2 px-1">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
