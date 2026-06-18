import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseServer
    .from("scooters")
    .insert({
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
      vedette: body.vedette ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la création du scooter." }, { status: 500 });
  }

  if (body.vedette) {
    await supabaseServer.from("scooters").update({ vedette: false }).neq("id", data.id);
  }

  revalidatePath("/");

  return NextResponse.json({ scooter: data });
}
