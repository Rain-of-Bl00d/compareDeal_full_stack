import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { checkAdminAuth } from "@/lib/auth"

export default async function AdminSecretPage() {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/admin-secret-panel/auth")
  }

  return <AdminDashboard />
}
