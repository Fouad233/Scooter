"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/scooters", label: "Scooters" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  // useState garde en mémoire si le menu mobile est ouvert ou fermé,
  // et redéclenche l'affichage du composant quand sa valeur change.
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-blue-900">
          Tetouan<span className="text-orange-500">Scoot</span>
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-foreground/80 transition-colors hover:text-blue-900"
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/scooters"
            className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 sm:inline-block"
          >
            Réserver
          </Link>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="md:hidden"
            onClick={() => setMenuOuvert((ouvert) => !ouvert)}
          >
            {menuOuvert ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOuvert && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 md:hidden">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
            >
              {lien.label}
            </Link>
          ))}
          <Link
            href="/scooters"
            onClick={() => setMenuOuvert(false)}
            className="mt-2 rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Réserver
          </Link>
        </nav>
      )}
    </header>
  );
}
