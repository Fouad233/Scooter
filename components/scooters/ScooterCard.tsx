import Link from "next/link";
import { Scooter } from "@/lib/types";

export function ScooterCard({ scooter }: { scooter: Scooter }) {
  return (
    <Link
      href={`/scooters/${scooter.id}`}
      className="group block overflow-hidden rounded-2xl border border-blue-900/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-blue-900/5 text-blue-900/30">
        Photo à venir
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-blue-950">{scooter.nom}</h3>
        <p className="text-sm text-blue-900/60">
          {scooter.modele}
          {scooter.cylindree ? ` · ${scooter.cylindree}cc` : ""}
        </p>
        <p className="mt-2 text-lg font-bold text-orange-600">
          {scooter.prix_jour} MAD / jour
        </p>
      </div>
    </Link>
  );
}
