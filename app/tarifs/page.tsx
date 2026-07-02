import type { Metadata } from "next";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tarifs — Badino",
  description: "Tarifs de location de scooters à Tétouan : prix à la journée, à la semaine et au mois, caution incluse.",
};

export const revalidate = 0;

export default async function TarifsPage() {
  const { data: scooters } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("actif", true)
    .order("prix_jour", { ascending: true });

  const liste = (scooters ?? []) as Scooter[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-950">Nos tarifs</h1>
      <p className="mt-2 text-zinc-800/70">
        Des prix transparents, sans frais cachés. Une caution est demandée
        pour chaque location et restituée au retour du scooter.
      </p>

      {liste.length === 0 ? (
        <p className="mt-10 text-zinc-800/60">
          Aucun scooter disponible pour le moment. Contactez-nous sur
          WhatsApp pour plus d&apos;informations.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-zinc-900/5 text-zinc-800/60">
                <th className="px-4 py-3 font-semibold">Scooter</th>
                <th className="px-4 py-3 font-semibold">Jour</th>
                <th className="px-4 py-3 font-semibold">Semaine</th>
                <th className="px-4 py-3 font-semibold">Mois</th>
                <th className="px-4 py-3 font-semibold">Caution</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {liste.map((scooter) => (
                <tr key={scooter.id} className="border-t border-zinc-200">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-zinc-950">{scooter.nom}</p>
                    <p className="text-zinc-800/60">{scooter.modele}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-orange-600">
                    {scooter.prix_jour} MAD
                  </td>
                  <td className="px-4 py-3 text-zinc-950">
                    {scooter.prix_semaine ? `${scooter.prix_semaine} MAD` : "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-950">
                    {scooter.prix_mois ? `${scooter.prix_mois} MAD` : "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-950">{scooter.caution} MAD</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/scooters/${scooter.id}`}
                      className="font-semibold text-orange-600 hover:underline"
                    >
                      Réserver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-zinc-900/5 p-6 text-sm text-zinc-800/80">
        <h2 className="font-semibold text-zinc-950">Comment fonctionne la caution ?</h2>
        <p className="mt-2">
          La réservation en ligne est gratuite et sans engagement de
          paiement. Le montant total de la location et la caution sont
          réglés sur place, en espèces ou par carte, lors de la prise en
          main du scooter. La caution vous est intégralement restituée au
          retour du véhicule, sous réserve qu&apos;il soit rendu dans
          l&apos;état du départ.
        </p>
      </div>
    </div>
  );
}
