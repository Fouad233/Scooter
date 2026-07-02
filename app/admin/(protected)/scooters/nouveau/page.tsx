import { ScooterForm } from "@/components/admin/ScooterForm";

export default function NouveauScooterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-950">Ajouter un scooter</h1>
      <div className="mt-6">
        <ScooterForm />
      </div>
    </div>
  );
}
