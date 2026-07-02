import { NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import { supabaseServer } from "@/lib/supabase/server";

const BUCKET = "scooters";
const TAILLE_MAX = 5 * 1024 * 1024;

// Extension canonique par type MIME réel (déterminée par magic bytes, pas le nom de fichier)
const MIME_VERS_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const fichier = formData.get("fichier");
  if (!(fichier instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json({ error: "Image trop lourde (max 5 Mo)." }, { status: 400 });
  }

  // Lit les octets réels du fichier et détecte le type par magic bytes
  const buffer = await fichier.arrayBuffer();
  const typeDetecte = await fileTypeFromBuffer(buffer);

  if (!typeDetecte || !MIME_VERS_EXTENSION[typeDetecte.mime]) {
    return NextResponse.json(
      { error: "Format d'image non supporté. Utilisez JPG, PNG, WebP ou GIF." },
      { status: 400 }
    );
  }

  // L'extension provient du type détecté, jamais du nom de fichier fourni par le client
  const extension = MIME_VERS_EXTENSION[typeDetecte.mime];
  const cheminFichier = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabaseServer.storage
    .from(BUCKET)
    .upload(cheminFichier, buffer, { contentType: typeDetecte.mime });

  if (error) {
    console.error("[upload] Supabase Storage error:", error.message);
    return NextResponse.json({ error: "Échec de l'envoi de l'image." }, { status: 500 });
  }

  const { data } = supabaseServer.storage.from(BUCKET).getPublicUrl(cheminFichier);
  return NextResponse.json({ url: data.publicUrl });
}
