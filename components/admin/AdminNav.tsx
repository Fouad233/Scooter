"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const liens = [
  { href: "/admin", label: "Réservations" },
  { href: "/admin/scooters", label: "Scooters" },
  { href: "/admin/indisponibilites", label: "Indisponibilités" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/10 pb-4">
      <div className="flex gap-4">
        {liens.map((lien) => (
          <Link
            key={lien.href}
            href={lien.href}
            className={cn(
              "text-sm font-semibold text-blue-900/60 hover:text-blue-950",
              pathname === lien.href && "text-blue-950"
            )}
          >
            {lien.label}
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="text-sm font-semibold text-blue-900/60 hover:text-blue-950"
      >
        Déconnexion
      </button>
    </nav>
  );
}
