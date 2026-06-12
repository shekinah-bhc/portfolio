"use server";
import { cookies } from "next/headers";

export async function authenticateAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  if (password === adminPassword) {
    (await cookies()).set("admin_auth", "true", { httpOnly: true, path: "/" });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_auth");
}
