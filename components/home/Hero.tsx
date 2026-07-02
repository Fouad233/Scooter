import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { ScooterPhoto } from "@/components/scooters/ScooterPhoto";

export async function Hero() {
  const [scooterResult, prixResult] = await Promise.all([
    supabaseServer
      .from("scooters")
      .select("nom, photo_urls")
      .eq("actif", true)
      .order("vedette", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabaseServer
      .from("scooters")
      .select("prix_jour")
      .eq("actif", true)
      .order("prix_jour", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const scooter = scooterResult.data;
  const prixMin = prixResult.data?.prix_jour;
  const photoUrl = scooter?.photo_urls?.[0];

  return (
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-sm font-medium text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Tétouan, Maroc
          </span>
          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Loue un scooter<br />
            à <span className="text-rose-500">Tétouan</span><br />
            en 2 minutes.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Réserve en ligne, paie tout sur place.<br />
            Simple, rapide, sans surprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/scooters"
              className="group inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 hover:shadow-rose-500/30 hover:gap-3"
            >
              Voir les scooters
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-bold text-white transition-all hover:border-white/30 hover:bg-white/5"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        <div className="relative">
          <ScooterPhoto
            url={photoUrl}
            alt={scooter?.nom ?? "Scooter"}
            className="aspect-[4/3] w-full rounded-3xl ring-1 ring-white/5"
          />
          {prixMin && (
            <div className="absolute -bottom-4 left-6 rounded-2xl bg-rose-500 px-5 py-3 shadow-xl shadow-rose-500/30">
              <p className="text-xs font-medium text-rose-100">À partir de</p>
              <p className="text-2xl font-black text-white">
                {prixMin} MAD<span className="text-sm font-medium"> /jour</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
