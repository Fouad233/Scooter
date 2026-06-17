import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabaseServer.from("indisponibilites").insert({
    scooter_id: body.scooter_id,
    date_debut: body.date_debut,
    date_fin: body.date_fin,
    raison: body.raison || null,
  });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la création." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
