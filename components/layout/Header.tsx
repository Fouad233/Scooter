"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const liens = [
  { href: "/scooters", label: "Scooters" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defileY, setDefileY] = useState(0);

  useEffect(() => {
    const onScroll = () => setDefileY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const estDefilé = defileY > 10;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        estDefilé
          ? "border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-black tracking-tight text-zinc-950">
          Badi<span className="text-rose-500">no</span>
        </Link>

        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-zinc-500 transition-colors hover:text-zinc-950"
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/scooters"
            className="hidden rounded-full bg-rose-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-rose-600 hover:shadow-md sm:inline-block"
          >
            Réserver
          </Link>
          <button
            type="button"
            aria-label="Menu"
            className="rounded-lg p-1.5 text-zinc-700 hover:bg-zinc-100 md:hidden"
            onClick={() => setMenuOuvert((o) => !o)}
          >
            {menuOuvert ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOuvert && (
        <nav className="flex flex-col gap-1 border-t border-zinc-100 bg-white px-4 py-3 md:hidden">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              onClick={() => setMenuOuvert(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              {lien.label}
            </Link>
          ))}
          <Link
            href="/scooters"
            onClick={() => setMenuOuvert(false)}
            className="mt-2 rounded-full bg-rose-500 px-4 py-2.5 text-center text-sm font-bold text-white"
          >
            Réserver
          </Link>
        </nav>
      )}
    </header>
  );
}
