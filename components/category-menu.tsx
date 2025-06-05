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
          <NavigationMenuContent className="left-auto right-0 w-[320px] sm:w-[380px] md:w-[420px] lg:w-[480px] xl:w-[520px] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
            <div className="p-3 lg:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                {categories.map((category) => (
                  <NavigationMenuLink key={category.name} asChild>
                    <Link
                      href={category.href}
                      className="block select-none space-y-1 rounded-md p-2 lg:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center min-w-0">
                        {category.icon}
                        <div className="text-sm font-medium leading-none truncate">{category.name}</div>
                      </div>
                      <p className="line-clamp-2 text-xs lg:text-sm leading-snug text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
