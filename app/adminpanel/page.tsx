import { cookies } from "next/headers";
import { AnalyticsDashboard } from "@/components/adminpanel/analytics/AnalyticsDashboard";
import type { VisitorStats } from "@/types/visitor";
import { PasswordForm } from "@/components/adminpanel/PasswordForm";

export const dynamic = 'force-dynamic';

async function getStats(): Promise<VisitorStats | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/analytics/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminPanelPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return <PasswordForm />;
  }

  const initialStats = await getStats();

  return <AnalyticsDashboard initialStats={initialStats} />;
}
