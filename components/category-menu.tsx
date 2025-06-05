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
    icon: <Laptop className="h-4 w-4 mr-2" />,
    description: "Laptops, TVs, cameras and more",
  },
  {
    name: "Mobile & Laptop",
    href: "/?category=mobile-laptop",
    icon: <Smartphone className="h-4 w-4 mr-2" />,
    description: "Smartphones, tablets and laptops",
  },
  {
    name: "Fashion",
    href: "/?category=fashion",
    icon: <Shirt className="h-4 w-4 mr-2" />,
    description: "Clothing, shoes and accessories",
  },
  {
    name: "Grocery",
    href: "/?category=grocery",
    icon: <ShoppingCart className="h-4 w-4 mr-2" />,
    description: "Food, beverages and household essentials",
  },
  {
    name: "Skin Care",
    href: "/?category=skin-care",
    icon: <Sparkles className="h-4 w-4 mr-2" />,
    description: "Skincare, makeup and beauty products",
  },
  {
    name: "Home & Kitchen",
    href: "/?category=home-kitchen",
    icon: <Home className="h-4 w-4 mr-2" />,
    description: "Furniture, appliances and kitchen essentials",
  },
]

export function CategoryMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <li key={category.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={category.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <div className="text-sm font-medium leading-none">{category.name}</div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{category.description}</p>
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
