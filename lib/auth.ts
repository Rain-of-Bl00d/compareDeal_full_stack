import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function checkAdminAuth() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("admin-token")?.value

    if (!token) return false

    const decoded = jwt.verify(token, JWT_SECRET) as any
    return !!decoded.adminId
  } catch (error) {
    return false
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(adminId: string) {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: "7d" })
}
