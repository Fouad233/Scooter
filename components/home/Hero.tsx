import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { ScooterPhoto } from "@/components/scooters/ScooterPhoto";

export async function Hero() {
  const { data: scooter } = await supabaseServer
    .from("scooters")
    .select("nom, photo_urls")
    .eq("actif", true)
    .order("vedette", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const photoUrl = scooter?.photo_urls?.[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
            Tétouan, Maroc
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-blue-950 sm:text-5xl">
            Louez un scooter à Tétouan en quelques clics
          </h1>
          <p className="mt-4 text-lg text-blue-900/70">
            Réservez en ligne gratuitement, payez tout sur place. Simple,
            rapide, sans surprise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scooters"
              className="rounded-full bg-orange-500 px-6 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
            >
              Réserver maintenant
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-blue-900/20 px-6 py-3 text-center font-semibold text-blue-900 transition-colors hover:bg-blue-900/5"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        <ScooterPhoto
          url={photoUrl}
          alt={scooter?.nom ?? "Scooter"}
          className="relative aspect-[4/3] w-full rounded-3xl bg-blue-900/5 shadow-inner"
        />
      </div>
    </section>
  );
}
