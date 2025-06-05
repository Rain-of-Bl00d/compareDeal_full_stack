"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { useSearchParams } from "next/navigation"

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
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">
          {searchQuery
            ? `No results for "${searchQuery}"`
            : category
              ? `No products found in ${category}`
              : "Try adjusting your search or filters"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
