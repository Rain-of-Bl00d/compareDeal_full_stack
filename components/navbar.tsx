"use client"

import Link from "next/link"
import { SearchBar } from "./search-bar"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CategoryMenu } from "./category-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CompareDeals
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:justify-center md:px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                0
              </span>
            </Button>
          </div>

          <div className="relative">
            <CategoryMenu />
          </div>

          <Button variant="ghost" size="icon" aria-label="User Account">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="md:hidden border-t p-2">
        <SearchBar />
      </div>
    </header>
  )
}
