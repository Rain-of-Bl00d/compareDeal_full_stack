import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const filter: any = {}

    if (category && category !== "all") {
      // Map frontend category values to database values
      const categoryMap: Record<string, string> = {
        electronics: "electronics",
        "mobile-laptop": "mobile-laptop",
        fashion: "fashion",
        grocery: "grocery",
        "skin-care": "skin-care",
        "home-kitchen": "home-kitchen",
      }

      filter.category = categoryMap[category] || category
    }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const products = await db.collection("products").find(filter).toArray()

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
