import { Scooter } from "@/lib/types";

export function ScooterSpecs({ scooter }: { scooter: Scooter }) {
  const lignes = [
    { label: "Modèle", valeur: scooter.modele },
    { label: "Cylindrée", valeur: scooter.cylindree ? `${scooter.cylindree} cc` : "—" },
    { label: "Tarif jour", valeur: `${scooter.prix_jour} MAD` },
    { label: "Tarif semaine", valeur: scooter.prix_semaine ? `${scooter.prix_semaine} MAD` : "—" },
    { label: "Tarif mois", valeur: scooter.prix_mois ? `${scooter.prix_mois} MAD` : "—" },
    { label: "Caution", valeur: `${scooter.caution} MAD` },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-200 bg-zinc-900/5 p-5 text-sm">
      {lignes.map((ligne) => (
        <div key={ligne.label}>
          <dt className="text-zinc-800/60">{ligne.label}</dt>
          <dd className="font-semibold text-zinc-950">{ligne.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}
