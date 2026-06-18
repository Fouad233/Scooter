import { supabaseServer } from "@/lib/supabase/server";
import { StatutBadge } from "@/components/admin/StatutBadge";
import { ReservationActions } from "@/components/admin/ReservationActions";

export const revalidate = 0;

export default async function AdminReservationsPage() {
  const { data: reservations } = await supabaseServer
    .from("reservations")
    .select("*, scooters(nom)")
    .neq("statut", "cancelled")
    .order("created_at", { ascending: false });

  const liste = reservations ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Réservations</h1>

      {liste.length === 0 ? (
        <p className="mt-6 text-blue-900/60">Aucune réservation pour le moment.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {liste.map((reservation) => (
            <div key={reservation.id} className="rounded-2xl border border-blue-900/10 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-blue-950">
                    {reservation.scooters?.nom ?? "Scooter supprimé"}
                  </p>
                  <p className="text-sm text-blue-900/60">
                    {reservation.date_debut} → {reservation.date_fin} · {reservation.montant_total} MAD
                  </p>
                </div>
                <StatutBadge statut={reservation.statut} />
              </div>

              <div className="mt-3 text-sm text-blue-900/80">
                <p>{reservation.client_nom}</p>
                <p>{reservation.client_email} · {reservation.client_telephone}</p>
              </div>

              <div className="mt-4">
                <ReservationActions reservationId={reservation.id} statutActuel={reservation.statut} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
