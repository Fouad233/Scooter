import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const BUCKET = "scooters";
const TYPES_AUTORISES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAILLE_MAX = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const fichier = formData.get("fichier");

  if (!(fichier instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  if (!TYPES_AUTORISES.includes(fichier.type)) {
    return NextResponse.json({ error: "Format d'image non supporté." }, { status: 400 });
  }

  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json({ error: "Image trop lourde (max 5 Mo)." }, { status: 400 });
  }

  const extension = fichier.name.split(".").pop() ?? "jpg";
  const cheminFichier = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabaseServer.storage
    .from(BUCKET)
    .upload(cheminFichier, fichier, { contentType: fichier.type });

  if (error) {
    return NextResponse.json({ error: "Échec de l'envoi de l'image." }, { status: 500 });
  }

  const { data } = supabaseServer.storage.from(BUCKET).getPublicUrl(cheminFichier);

  return NextResponse.json({ url: data.publicUrl });
}
