import Link from "next/link"
import { Laptop, Smartphone, ShoppingCart, Home, Shirt, Sparkles } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    href: "/?category=electronics",
    icon: <Laptop className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-blue-100",
  },
  {
    name: "Mobile & Laptop",
    href: "/?category=mobile-laptop",
    icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-purple-100",
  },
  {
    name: "Fashion",
    href: "/?category=fashion",
    icon: <Shirt className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-pink-100",
  },
  {
    name: "Grocery",
    href: "/?category=grocery",
    icon: <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-green-100",
  },
  {
    name: "Skin Care",
    href: "/?category=skin-care",
    icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-yellow-100",
  },
  {
    name: "Home & Kitchen",
    href: "/?category=home-kitchen",
    icon: <Home className="h-6 w-6 sm:h-8 sm:w-8" />,
    color: "bg-red-100",
  },
]

export function CategorySection() {
  return (
    <section id="categories" className="py-6 md:py-8 lg:py-12">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center justify-center p-4 md:p-6 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105 group"
          >
            <div
              className={`rounded-full ${category.color} p-3 md:p-4 mb-2 md:mb-3 group-hover:scale-110 transition-transform`}
            >
              {category.icon}
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-center leading-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
