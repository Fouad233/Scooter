import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { IndisponibiliteForm } from "@/components/admin/IndisponibiliteForm";
import { SupprimerIndisponibilite } from "@/components/admin/SupprimerIndisponibilite";

export const revalidate = 0;

export default async function AdminIndisponibilitesPage() {
  const [{ data: scooters }, { data: indisponibilites }] = await Promise.all([
    supabaseServer.from("scooters").select("*").eq("actif", true),
    supabaseServer
      .from("indisponibilites")
      .select("*, scooters(nom)")
      .order("date_debut", { ascending: false }),
  ]);

  const listeScooters = (scooters ?? []) as Scooter[];
  const liste = indisponibilites ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-950">Indisponibilités</h1>
      <p className="mt-1 text-sm text-zinc-800/60">
        Bloquez manuellement des dates pour un scooter (entretien, panne, etc.).
      </p>

      {listeScooters.length === 0 ? (
        <p className="mt-6 text-zinc-800/60">Ajoute d&apos;abord un scooter pour pouvoir bloquer des dates.</p>
      ) : (
        <div className="mt-6">
          <IndisponibiliteForm scooters={listeScooters} />
        </div>
      )}

      <div className="mt-8 space-y-3">
        {liste.map((indispo) => (
          <div key={indispo.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4">
            <div>
              <p className="font-semibold text-zinc-950">{indispo.scooters?.nom ?? "Scooter supprimé"}</p>
              <p className="text-sm text-zinc-800/60">
                {indispo.date_debut} → {indispo.date_fin}
                {indispo.raison ? ` · ${indispo.raison}` : ""}
              </p>
            </div>
            <SupprimerIndisponibilite id={indispo.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
