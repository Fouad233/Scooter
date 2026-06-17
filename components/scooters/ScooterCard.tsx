import Link from "next/link";
import { Scooter } from "@/lib/types";
import { ScooterPhoto } from "@/components/scooters/ScooterPhoto";

export function ScooterCard({ scooter }: { scooter: Scooter }) {
  return (
    <Link
      href={`/scooters/${scooter.id}`}
      className="group block overflow-hidden rounded-2xl border border-blue-900/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <ScooterPhoto url={scooter.photo_urls?.[0]} alt={scooter.nom} className="aspect-[4/3]" />
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
