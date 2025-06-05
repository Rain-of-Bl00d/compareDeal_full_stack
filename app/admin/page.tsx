import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { checkAdminAuth } from "@/lib/auth"

export default async function AdminPage() {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
