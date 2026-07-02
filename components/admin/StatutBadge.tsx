import { StatutReservation } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<StatutReservation, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  completed: "bg-zinc-900/10 text-zinc-800/70",
  cancelled: "bg-red-100 text-red-700",
};

const LABELS: Record<StatutReservation, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  paid: "Payée",
  completed: "Terminée",
  cancelled: "Annulée",
};

export function StatutBadge({ statut }: { statut: StatutReservation }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", STYLES[statut])}>
      {LABELS[statut]}
    </span>
  );
}
