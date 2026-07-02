import { NextResponse } from "next/server";
import { differenceInCalendarDays, parseISO, isValid, isBefore, startOfToday } from "date-fns";
import { supabaseServer, supabaseAnon } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { rateLimit, ipDepuisRequest } from "@/lib/ratelimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NOM = 120;
const MAX_EMAIL = 254;
const MAX_TEL = 30;

function htmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function calculerMontant(scooter: Scooter, jours: number) {
  if (jours >= 30 && scooter.prix_mois) {
    return Math.round((scooter.prix_mois / 30) * jours);
  }
  if (jours >= 7 && scooter.prix_semaine) {
    return Math.round((scooter.prix_semaine / 7) * jours);
  }
  return scooter.prix_jour * jours;
}

export async function POST(request: Request) {
  // 5 réservations max par IP sur 1 heure pour limiter les abus
  const ip = ipDepuisRequest(request);
  const { autorise, retryAfterMs } = rateLimit(`reservation:${ip}`, 5, 60 * 60 * 1000);
  if (!autorise) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { scooterId, dateDebut, dateFin, nom, email, telephone } = body;

  // Vérification présence
  if (!scooterId || !dateDebut || !dateFin || !nom || !email || !telephone) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  // Validation des types
  if (
    typeof scooterId !== "string" ||
    typeof dateDebut !== "string" ||
    typeof dateFin !== "string" ||
    typeof nom !== "string" ||
    typeof email !== "string" ||
    typeof telephone !== "string"
  ) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  // Longueurs max
  if (nom.length > MAX_NOM || email.length > MAX_EMAIL || telephone.length > MAX_TEL) {
    return NextResponse.json({ error: "Un ou plusieurs champs sont trop longs." }, { status: 400 });
  }

  // Format email
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  // Validation des dates
  const debut = parseISO(dateDebut);
  const fin = parseISO(dateFin);
  if (!isValid(debut) || !isValid(fin)) {
    return NextResponse.json({ error: "Dates invalides." }, { status: 400 });
  }

  // La date de début ne peut pas être dans le passé
  if (isBefore(debut, startOfToday())) {
    return NextResponse.json({ error: "La date de début ne peut pas être dans le passé." }, { status: 400 });
  }

  const jours = differenceInCalendarDays(fin, debut) + 1;
  if (jours < 1) {
    return NextResponse.json({ error: "Période invalide." }, { status: 400 });
  }

  // Lecture du scooter avec le client anon (respecte la RLS publique)
  const { data: scooter } = await supabaseAnon
    .from("scooters")
    .select("*")
    .eq("id", scooterId)
    .eq("actif", true)
    .single();

  if (!scooter) {
    return NextResponse.json({ error: "Scooter introuvable." }, { status: 404 });
  }

  // Vérification des conflits via la vue publique (ne révèle pas les données clients)
  const { data: conflits } = await supabaseAnon
    .from("reservations_dates_bloquees")
    .select("scooter_id")
    .eq("scooter_id", scooterId)
    .lte("date_debut", dateFin)
    .gte("date_fin", dateDebut);

  if (conflits && conflits.length > 0) {
    return NextResponse.json(
      { error: "Ces dates ne sont plus disponibles pour ce scooter." },
      { status: 409 }
    );
  }

  const montantTotal = calculerMontant(scooter as Scooter, jours);

  // Insert avec service role (nécessaire pour contourner la RLS sur les inserts)
  const { data: reservation, error } = await supabaseServer
    .from("reservations")
    .insert({
      scooter_id: scooterId,
      client_nom: htmlEscape(nom.trim()),
      client_email: email.trim().toLowerCase(),
      client_telephone: telephone.trim(),
      date_debut: dateDebut,
      date_fin: dateFin,
      statut: "pending",
      montant_total: montantTotal,
    })
    .select()
    .single();

  if (error) {
    console.error("[reservations] insert error:", error.message);
    return NextResponse.json({ error: "Erreur lors de la création de la réservation." }, { status: 500 });
  }

  return NextResponse.json({ reservation });
}
