"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { Laptop, Smartphone, ShoppingCart, Home, Shirt, Sparkles, LayoutGrid } from "lucide-react"

const categories = [
  { id: "all", name: "All Categories", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "electronics", name: "Electronics", icon: <Laptop className="h-4 w-4" /> },
  { id: "mobile-laptop", name: "Mobile & Laptop", icon: <Smartphone className="h-4 w-4" /> },
  { id: "fashion", name: "Fashion", icon: <Shirt className="h-4 w-4" /> },
  { id: "grocery", name: "Grocery", icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "skin-care", name: "Skin Care", icon: <Sparkles className="h-4 w-4" /> },
  { id: "home-kitchen", name: "Home & Kitchen", icon: <Home className="h-4 w-4" /> },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")

  useEffect(() => {
    const category = searchParams.get("category")
    setSelectedCategory(category || "all")
  }, [searchParams])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)

    const params = new URLSearchParams(searchParams.toString())

    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              selectedCategory === category.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
