import Link from "next/link"
import { Laptop, Smartphone, ShoppingCart, Home, Shirt, Sparkles } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    href: "/?category=electronics",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-blue-100",
  },
  {
    name: "Mobile & Laptop",
    href: "/?category=mobile-laptop",
    icon: <Smartphone className="h-8 w-8" />,
    color: "bg-purple-100",
  },
  {
    name: "Fashion",
    href: "/?category=fashion",
    icon: <Shirt className="h-8 w-8" />,
    color: "bg-pink-100",
  },
  {
    name: "Grocery",
    href: "/?category=grocery",
    icon: <ShoppingCart className="h-8 w-8" />,
    color: "bg-green-100",
  },
  {
    name: "Skin Care",
    href: "/?category=skin-care",
    icon: <Sparkles className="h-8 w-8" />,
    color: "bg-yellow-100",
  },
  {
    name: "Home & Kitchen",
    href: "/?category=home-kitchen",
    icon: <Home className="h-8 w-8" />,
    color: "bg-red-100",
  },
]

export function CategorySection() {
  return (
    <section id="categories" className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center justify-center p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className={`rounded-full ${category.color} p-4 mb-3`}>{category.icon}</div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
