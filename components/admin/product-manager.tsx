"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

interface Product {
  _id?: string
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

interface ProductManagerProps {
  onStatsUpdate?: () => void
}

interface AffiliateLink {
  platform: string
  url: string
}

export function ProductManager({ onStatsUpdate }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([{ platform: "amazon", url: "" }])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (editingProduct) {
      // Convert existing product links to the new format
      const links: AffiliateLink[] = []
      if (editingProduct.amazonLink) {
        links.push({ platform: "amazon", url: editingProduct.amazonLink })
      }
      if (editingProduct.flipkartLink) {
        links.push({ platform: "flipkart", url: editingProduct.flipkartLink })
      }
      if (editingProduct.meeshowLink) {
        links.push({ platform: "meeshow", url: editingProduct.meeshowLink })
      }
      if (editingProduct.otherLinks) {
        links.push(...editingProduct.otherLinks)
      }
      setAffiliateLinks(links.length > 0 ? links : [{ platform: "amazon", url: "" }])
    } else {
      // Reset for new product
      setAffiliateLinks([{ platform: "amazon", url: "" }])
    }
  }, [editingProduct])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products")
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const addAffiliateLink = () => {
    setAffiliateLinks([...affiliateLinks, { platform: "amazon", url: "" }])
  }

  const removeAffiliateLink = (index: number) => {
    if (affiliateLinks.length > 1) {
      setAffiliateLinks(affiliateLinks.filter((_, i) => i !== index))
    }
  }

  const updateAffiliateLink = (index: number, field: "platform" | "url", value: string) => {
    const updatedLinks = [...affiliateLinks]
    updatedLinks[index][field] = value
    setAffiliateLinks(updatedLinks)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)

    // Convert affiliate links back to the original format for backward compatibility
    const productData: any = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      category: formData.get("category") as string,
    }

    // Process affiliate links
    const otherLinks: Array<{ platform: string; url: string }> = []

    affiliateLinks.forEach((link) => {
      if (link.url.trim()) {
        switch (link.platform) {
          case "amazon":
            productData.amazonLink = link.url
            break
          case "flipkart":
            productData.flipkartLink = link.url
            break
          case "meeshow":
            productData.meeshowLink = link.url
            break
          default:
            otherLinks.push({ platform: link.platform, url: link.url })
        }
      }
    })

    if (otherLinks.length > 0) {
      productData.otherLinks = otherLinks
    }

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(editingProduct ? "Product updated successfully!" : "Product created successfully!")
        handleDialogClose()
        fetchProducts()
        onStatsUpdate?.()
        // Clear the form
        const form = e.currentTarget
        form.reset()
      } else {
        setMessage(data.error || "Operation failed")
      }
    } catch (error) {
      setMessage("Network error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setAffiliateLinks([{ platform: "amazon", url: "" }])
    setMessage("")
    setIsDialogOpen(true)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMessage("Product deleted successfully!")
        fetchProducts()
        onStatsUpdate?.()
      } else {
        setMessage("Failed to delete product")
      }
    } catch (error) {
      setMessage("Network error occurred")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        const imageInput = document.getElementById("image") as HTMLInputElement
        if (imageInput) imageInput.value = data.url
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
    setAffiliateLinks([{ platform: "amazon", url: "" }])
    setMessage("")
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Products</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    key={editingProduct?._id || "new"}
                    defaultValue={editingProduct?.name || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    key={`category-${editingProduct?._id || "new"}`}
                    defaultValue={editingProduct?.category || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="mobile-laptop">Mobile & Laptop</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="skin-care">Skin Care</SelectItem>
                      <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  key={`description-${editingProduct?._id || "new"}`}
                  defaultValue={editingProduct?.description || ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  key={`price-${editingProduct?._id || "new"}`}
                  defaultValue={editingProduct?.price || ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    key={`image-${editingProduct?._id || "new"}`}
                    defaultValue={editingProduct?.image || ""}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Affiliate Links</h3>
                  <Button type="button" onClick={addAffiliateLink} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                <div className="space-y-3">
                  {affiliateLinks.map((link, index) => (
                    <div
                      key={`${editingProduct?._id || "new"}-${index}`}
                      className="flex gap-3 items-start p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="w-32">
                        <Select
                          value={link.platform}
                          onValueChange={(value) => updateAffiliateLink(index, "platform", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amazon">Amazon</SelectItem>
                            <SelectItem value="flipkart">Flipkart</SelectItem>
                            <SelectItem value="meeshow">Meeshow</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Input
                          type="url"
                          placeholder={`Enter ${link.platform} URL...`}
                          value={link.url}
                          onChange={(e) => updateAffiliateLink(index, "url", e.target.value)}
                        />
                      </div>
                      {affiliateLinks.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeAffiliateLink(index)}
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg?height=50&width=50"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category?.replace("-", " ")}</TableCell>
                  <TableCell>₹{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.amazonLink && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Amazon</span>
                      )}
                      {product.flipkartLink && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Flipkart</span>
                      )}
                      {product.meeshowLink && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Meeshow</span>
                      )}
                      {product.otherLinks?.map((link, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded capitalize">
                          {link.platform}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product._id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found. Add your first product to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
