"use client"

import Link from "next/link"
import { SearchBar } from "./search-bar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CategoryMenu } from "./category-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center min-w-0 flex-shrink-0">
          <Link href="/" className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              CompareDeals
            </h1>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:px-6 xl:px-8 lg:max-w-xl xl:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <CategoryMenu />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center flex-shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <CategoryMenu isMobile={true} onItemClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden border-t bg-gray-50/80 p-3 sm:p-4">
        <SearchBar />
      </div>
    </header>
  )
}
