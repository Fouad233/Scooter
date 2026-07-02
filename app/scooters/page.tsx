import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { ScooterCard } from "@/components/scooters/ScooterCard";

export const metadata: Metadata = {
  title: "Nos scooters — TetouanScoot",
  description: "Découvrez notre flotte de scooters disponibles à la location à Tétouan.",
};

export const revalidate = 0;

export default async function ScootersPage() {
  const { data: scooters } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("actif", true)
    .order("prix_jour", { ascending: true });

  const liste = (scooters ?? []) as Scooter[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-950">Nos scooters</h1>
      <p className="mt-2 text-zinc-800/70">
        Choisissez le scooter qui vous convient et réservez-le en ligne.
      </p>

      {liste.length === 0 ? (
        <p className="mt-10 text-zinc-800/60">
          Aucun scooter disponible pour le moment. Contactez-nous sur
          WhatsApp pour plus d&apos;informations.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((scooter) => (
            <ScooterCard key={scooter.id} scooter={scooter} />
          ))}
        </div>
      )}
    </div>
  );
}
