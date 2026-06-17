"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scooter } from "@/lib/types";

export function IndisponibiliteForm({ scooters }: { scooters: Scooter[] }) {
  const router = useRouter();
  const [scooterId, setScooterId] = useState(scooters[0]?.id ?? "");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [raison, setRaison] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setEnvoi(true);
    setErreur(null);

    const response = await fetch("/api/admin/indisponibilites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scooter_id: scooterId, date_debut: dateDebut, date_fin: dateFin, raison }),
    });

    setEnvoi(false);

    if (!response.ok) {
      setErreur("Une erreur est survenue.");
      return;
    }

    setDateDebut("");
    setDateFin("");
    setRaison("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-blue-900/10 bg-white p-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="scooter" className="mb-2 block">Scooter</Label>
        <select
          id="scooter"
          value={scooterId}
          onChange={(e) => setScooterId(e.target.value)}
          className="w-full rounded-md border border-blue-900/20 px-3 py-2 text-sm"
        >
          {scooters.map((scooter) => (
            <option key={scooter.id} value={scooter.id}>{scooter.nom}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="raison" className="mb-2 block">Raison (optionnel)</Label>
        <Input id="raison" value={raison} onChange={(e) => setRaison(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="dateDebut" className="mb-2 block">Date de début</Label>
        <Input id="dateDebut" type="date" required value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="dateFin" className="mb-2 block">Date de fin</Label>
        <Input id="dateFin" type="date" required value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
      </div>

      {erreur && <p className="text-sm text-red-600 sm:col-span-2">{erreur}</p>}

      <Button type="submit" disabled={envoi} className="rounded-full bg-orange-500 hover:bg-orange-600 sm:col-span-2">
        {envoi ? "Ajout..." : "Bloquer ces dates"}
      </Button>
    </form>
  );
}
