import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const admin = await db.collection("admins").findOne({ email: email.toLowerCase() })

    if (!admin) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account with this email exists, password reset instructions have been sent",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token to database
    await db.collection("admins").updateOne(
      { _id: admin._id },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
          resetTokenUsed: false,
        },
      },
    )

    // In a real application, you would send an email here
    console.log(`Password reset requested for: ${email}`)
    console.log(`Reset token: ${resetToken}`)
    console.log(`Reset URL: ${process.env.NEXT_PUBLIC_APP_URL}/admin-secret-panel/reset-password?token=${resetToken}`)

    return NextResponse.json({
      success: true,
      message: "If an account with this email exists, password reset instructions have been sent",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
