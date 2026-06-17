"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatutReservation } from "@/lib/types";
import { Button } from "@/components/ui/button";

const ACTIONS: { statut: StatutReservation; label: string }[] = [
  { statut: "confirmed", label: "Confirmer" },
  { statut: "paid", label: "Marquer payée" },
  { statut: "completed", label: "Marquer terminée" },
  { statut: "cancelled", label: "Annuler" },
];

export function ReservationActions({ reservationId, statutActuel }: { reservationId: string; statutActuel: StatutReservation }) {
  const router = useRouter();
  const [envoi, setEnvoi] = useState<string | null>(null);

  async function changerStatut(statut: StatutReservation) {
    setEnvoi(statut);
    await fetch(`/api/admin/reservations/${reservationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    setEnvoi(null);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.filter((action) => action.statut !== statutActuel).map((action) => (
        <Button
          key={action.statut}
          variant="outline"
          size="sm"
          disabled={envoi !== null}
          onClick={() => changerStatut(action.statut)}
        >
          {envoi === action.statut ? "..." : action.label}
        </Button>
      ))}
    </div>
  );
}
