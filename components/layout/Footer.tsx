import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-blue-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">
            Tetouan<span className="text-orange-400">Scoot</span>
          </p>
          <p className="mt-2 text-sm text-white/70">
            Location de scooters à Tétouan, Maroc. Simple, rapide, sans
            surprise.
          </p>
        </div>

        <div>
          <p className="font-semibold">Navigation</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>
              <Link href="/scooters" className="hover:text-white">
                Nos scooters
              </Link>
            </li>
            <li>
              <Link href="/tarifs" className="hover:text-white">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Informations légales</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgl" className="hover:text-white">
                Conditions générales de location
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-white">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} TetouanScoot — Tétouan, Maroc
      </div>
    </footer>
  );
}
