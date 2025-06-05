import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { checkAdminAuth } from "@/lib/auth"

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const totalProducts = await db.collection("products").countDocuments()
    const totalCategories = 3 // Electronics, Grocery, Medicine

    // Count products with affiliate links
    const productsWithLinks = await db.collection("products").countDocuments({
      $or: [
        { amazonLink: { $exists: true, $ne: "" } },
        { flipkartLink: { $exists: true, $ne: "" } },
        { meeshowLink: { $exists: true, $ne: "" } },
      ],
    })

    const totalAdmins = await db.collection("admins").countDocuments()

    return NextResponse.json({
      totalProducts,
      totalCategories,
      activeLinks: productsWithLinks,
      totalAdmins,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
