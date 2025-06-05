"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Filter, SortAsc } from "lucide-react"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  amazonLink?: string
  flipkartLink?: string
  meeshowLink?: string
  otherLinks?: Array<{ platform: string; url: string }>
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "price" | "newest">("newest")
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const searchQuery = searchParams.get("search")

  useEffect(() => {
    fetchProducts()
  }, [category, searchQuery])

  const fetchProducts = async () => {
    try {
      let url = "/api/products"
      const params = new URLSearchParams()

      if (category) {
        params.append("category", category)
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        return a.price - b.price
      case "newest":
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton for filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Loading skeleton for products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 md:py-16">
        <h3 className="text-lg md:text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground text-sm md:text-base">
          {searchQuery
            ? `No results for "${searchQuery}"`
            : category
              ? `No products found in ${category.replace("-", " ")}`
              : "Try adjusting your search or filters"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="text-sm md:text-base text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""} found
          {category && (
            <span className="ml-1">
              in <span className="font-medium capitalize">{category.replace("-", " ")}</span>
            </span>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortBy(sortBy === "price" ? "newest" : "price")}
            className="flex-1 sm:flex-none"
          >
            <SortAsc className="h-4 w-4 mr-2" />
            {sortBy === "price" ? "Price ↑" : "Sort by Price"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortBy(sortBy === "name" ? "newest" : "name")}
            className="flex-1 sm:flex-none"
          >
            <Filter className="h-4 w-4 mr-2" />
            {sortBy === "name" ? "Name A-Z" : "Sort by Name"}
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
