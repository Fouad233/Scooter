import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { error } = await supabaseServer
    .from("scooters")
    .update({
      nom: body.nom,
      modele: body.modele,
      cylindree: body.cylindree || null,
      photo_urls: body.photo_urls ?? [],
      prix_jour: body.prix_jour,
      prix_semaine: body.prix_semaine || null,
      prix_mois: body.prix_mois || null,
      caution: body.caution,
      description: body.description || null,
      actif: body.actif ?? true,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
