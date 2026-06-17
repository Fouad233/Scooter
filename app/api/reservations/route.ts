import { NextResponse } from "next/server";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";

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
  const body = await request.json();
  const { scooterId, dateDebut, dateFin, nom, email, telephone } = body;

  if (!scooterId || !dateDebut || !dateFin || !nom || !email || !telephone) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  const { data: scooter } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("id", scooterId)
    .eq("actif", true)
    .single();

  if (!scooter) {
    return NextResponse.json({ error: "Scooter introuvable." }, { status: 404 });
  }

  const debut = parseISO(dateDebut);
  const fin = parseISO(dateFin);
  const jours = differenceInCalendarDays(fin, debut) + 1;

  if (jours < 1) {
    return NextResponse.json({ error: "Période invalide." }, { status: 400 });
  }

  const { data: conflits } = await supabaseServer
    .from("reservations")
    .select("id")
    .eq("scooter_id", scooterId)
    .in("statut", ["pending", "confirmed", "paid"])
    .lte("date_debut", dateFin)
    .gte("date_fin", dateDebut);

  if (conflits && conflits.length > 0) {
    return NextResponse.json(
      { error: "Ces dates ne sont plus disponibles pour ce scooter." },
      { status: 409 }
    );
  }

  const montantTotal = calculerMontant(scooter as Scooter, jours);

  const { data: reservation, error } = await supabaseServer
    .from("reservations")
    .insert({
      scooter_id: scooterId,
      client_nom: nom,
      client_email: email,
      client_telephone: telephone,
      date_debut: dateDebut,
      date_fin: dateFin,
      statut: "pending",
      montant_total: montantTotal,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la création de la réservation." }, { status: 500 });
  }

  return NextResponse.json({ reservation });
}
