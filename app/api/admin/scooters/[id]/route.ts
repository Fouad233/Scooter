import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

function validerCorps(body: Record<string, unknown>) {
  const nom = typeof body.nom === "string" ? body.nom.trim() : "";
  const modele = typeof body.modele === "string" ? body.modele.trim() : "";
  const prixJour = Number(body.prix_jour);
  const caution = Number(body.caution);

  if (!nom || nom.length > 120) return { valide: false, erreur: "Nom invalide." };
  if (!modele || modele.length > 120) return { valide: false, erreur: "Modèle invalide." };
  if (!Number.isFinite(prixJour) || prixJour <= 0) return { valide: false, erreur: "Prix/jour invalide." };
  if (!Number.isFinite(caution) || caution < 0) return { valide: false, erreur: "Caution invalide." };

  const cylindree = body.cylindree != null ? Number(body.cylindree) : null;
  const prixSemaine = body.prix_semaine != null ? Number(body.prix_semaine) : null;
  const prixMois = body.prix_mois != null ? Number(body.prix_mois) : null;

  const photoUrls = Array.isArray(body.photo_urls)
    ? (body.photo_urls as unknown[]).filter((u) => typeof u === "string").slice(0, 20)
    : [];

  return {
    valide: true,
    champs: {
      nom,
      modele,
      cylindree: cylindree && Number.isFinite(cylindree) ? cylindree : null,
      photo_urls: photoUrls,
      prix_jour: prixJour,
      prix_semaine: prixSemaine && Number.isFinite(prixSemaine) ? prixSemaine : null,
      prix_mois: prixMois && Number.isFinite(prixMois) ? prixMois : null,
      caution,
      description: typeof body.description === "string" ? body.description.slice(0, 2000) : null,
      actif: body.actif !== false,
      vedette: body.vedette === true,
    },
  };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const validation = validerCorps(body);
  if (!validation.valide) {
    return NextResponse.json({ error: validation.erreur }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from("scooters")
    .update(validation.champs!)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  if (validation.champs!.vedette) {
    await supabaseServer.from("scooters").update({ vedette: false }).neq("id", id);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
