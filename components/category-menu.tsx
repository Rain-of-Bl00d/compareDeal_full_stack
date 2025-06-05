"use client"
import Link from "next/link"
import { Laptop, Smartphone, ShoppingCart, Home, Shirt, Sparkles } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = [
  {
    name: "Electronics",
    href: "/?category=electronics",
    icon: <Laptop className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Laptops, TVs, cameras and more",
  },
  {
    name: "Mobile & Laptop",
    href: "/?category=mobile-laptop",
    icon: <Smartphone className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Smartphones, tablets and laptops",
  },
  {
    name: "Fashion",
    href: "/?category=fashion",
    icon: <Shirt className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Clothing, shoes and accessories",
  },
  {
    name: "Grocery",
    href: "/?category=grocery",
    icon: <ShoppingCart className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Food, beverages and household essentials",
  },
  {
    name: "Skin Care",
    href: "/?category=skin-care",
    icon: <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Skincare, makeup and beauty products",
  },
  {
    name: "Home & Kitchen",
    href: "/?category=home-kitchen",
    icon: <Home className="h-4 w-4 mr-2 flex-shrink-0" />,
    description: "Furniture, appliances and kitchen essentials",
  },
]

interface CategoryMenuProps {
  isMobile?: boolean
  onItemClick?: () => void
}

export function CategoryMenu({ isMobile = false, onItemClick }: CategoryMenuProps) {
  if (isMobile) {
    return (
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={onItemClick}
              className="flex items-start p-3 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center min-w-0 flex-1">
                {category.icon}
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{category.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">{category.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-sm lg:text-base">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[350px] gap-2 p-3 md:w-[450px] md:grid-cols-2 lg:w-[550px] xl:w-[600px] lg:gap-3 lg:p-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={category.href}
                      className="block select-none space-y-1 rounded-md p-2 lg:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center min-w-0">
                        {category.icon}
                        <div className="text-sm font-medium leading-none truncate">{category.name}</div>
                      </div>
                      <p className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground">
                        {category.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
