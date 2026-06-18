import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { StatutReservation } from "@/lib/types";
import { envoyerEmailConfirmation } from "@/lib/email";

const STATUTS_VALIDES: StatutReservation[] = [
  "pending",
  "confirmed",
  "paid",
  "cancelled",
  "completed",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { statut } = await request.json();

  if (!STATUTS_VALIDES.includes(statut)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const { data: reservation, error } = await supabaseServer
    .from("reservations")
    .update({ statut })
    .eq("id", id)
    .select("*, scooters(nom)")
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  if (statut === "confirmed") {
    await envoyerEmailConfirmation({
      destinataire: reservation.client_email,
      clientNom: reservation.client_nom,
      scooterNom: reservation.scooters?.nom ?? "votre scooter",
      dateDebut: reservation.date_debut,
      dateFin: reservation.date_fin,
      montantTotal: reservation.montant_total,
    });
  }

  return NextResponse.json({ ok: true });
}
