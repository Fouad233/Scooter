import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <p className="text-xl font-black tracking-tight">
            Badi<span className="text-rose-500">no</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Location de scooters à Tétouan, Maroc.<br />
            Simple, rapide, sans surprise.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/scooters" className="text-zinc-400 transition-colors hover:text-white">Nos scooters</Link></li>
            <li><Link href="/tarifs" className="text-zinc-400 transition-colors hover:text-white">Tarifs</Link></li>
            <li><Link href="/contact" className="text-zinc-400 transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Légal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/mentions-legales" className="text-zinc-400 transition-colors hover:text-white">Mentions légales</Link></li>
            <li><Link href="/cgl" className="text-zinc-400 transition-colors hover:text-white">Conditions de location</Link></li>
            <li><Link href="/confidentialite" className="text-zinc-400 transition-colors hover:text-white">Confidentialité</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Badino — Tétouan, Maroc</span>
          <Link href="/admin" className="transition-colors hover:text-zinc-400">Espace admin</Link>
        </div>
      </div>
    </footer>
  );
}
