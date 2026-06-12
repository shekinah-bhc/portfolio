"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateAdmin } from "@/app/adminpanel/actions";

export function PasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const success = await authenticateAdmin(password);
    if (success) {
      router.refresh();
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/95 text-white font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-xl">
        <h1 className="text-2xl font-bold mb-6 text-center italic tracking-tight">Admin <span className="text-red-500">Access</span></h1>
        
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-sm"
          />
        </div>

        {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? "Verifying..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
