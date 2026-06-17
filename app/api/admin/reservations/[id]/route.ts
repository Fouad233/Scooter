import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { StatutReservation } from "@/lib/types";

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

  const { error } = await supabaseServer
    .from("reservations")
    .update({ statut })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
