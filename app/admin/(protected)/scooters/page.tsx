import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";

export const revalidate = 0;

export default async function AdminScootersPage() {
  const { data: scooters } = await supabaseServer
    .from("scooters")
    .select("*")
    .order("created_at", { ascending: false });

  const liste = (scooters ?? []) as Scooter[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-950">Scooters</h1>
        <Link
          href="/admin/scooters/nouveau"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Ajouter un scooter
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {liste.map((scooter) => (
          <Link
            key={scooter.id}
            href={`/admin/scooters/${scooter.id}`}
            className="flex items-center justify-between rounded-2xl border border-blue-900/10 bg-white p-4 hover:shadow-sm"
          >
            <div>
              <p className="font-semibold text-blue-950">{scooter.nom}</p>
              <p className="text-sm text-blue-900/60">{scooter.modele} · {scooter.prix_jour} MAD/jour</p>
            </div>
            <span className={scooter.actif ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600"}>
              {scooter.actif ? "Visible" : "Masqué"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
