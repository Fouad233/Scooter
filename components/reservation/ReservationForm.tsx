"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, eachDayOfInterval, format, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Scooter } from "@/lib/types";

export function ReservationForm({ scooter }: { scooter: Scooter }) {
  const router = useRouter();
  const [datesIndisponibles, setDatesIndisponibles] = useState<Date[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    async function chargerDatesBloquees() {
      const [{ data: reservations }, { data: indisponibilites }] = await Promise.all([
        supabaseBrowser
          .from("reservations_dates_bloquees")
          .select("date_debut, date_fin")
          .eq("scooter_id", scooter.id),
        supabaseBrowser
          .from("indisponibilites")
          .select("date_debut, date_fin")
          .eq("scooter_id", scooter.id),
      ]);

      const periodes = [...(reservations ?? []), ...(indisponibilites ?? [])];
      const jours = periodes.flatMap((periode) =>
        eachDayOfInterval({ start: parseISO(periode.date_debut), end: parseISO(periode.date_fin) })
      );
      setDatesIndisponibles(jours);
    }

    chargerDatesBloquees();
  }, [scooter.id]);

  const jours = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) + 1 : 0;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErreur(null);

    if (!range?.from || !range?.to) {
      setErreur("Choisissez une date de départ et une date de retour.");
      return;
    }

    setEnvoi(true);

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scooterId: scooter.id,
        dateDebut: format(range.from, "yyyy-MM-dd"),
        dateFin: format(range.to, "yyyy-MM-dd"),
        nom,
        email,
        telephone,
      }),
    });

    const result = await response.json();
    setEnvoi(false);

    if (!response.ok) {
      setErreur(result.error ?? "Une erreur est survenue.");
      return;
    }

    router.push(`/reservation/confirmation?id=${result.reservation.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="mb-2 block">Dates de location</Label>
        <div className="rounded-2xl border border-blue-900/10 bg-white p-2">
          <Calendar
            mode="range"
            locale={fr}
            selected={range}
            onSelect={setRange}
            disabled={[{ before: new Date() }, ...datesIndisponibles]}
            className="w-full"
          />
        </div>
        {jours > 0 && (
          <p className="mt-2 text-sm text-blue-900/70">
            Durée sélectionnée : <span className="font-semibold">{jours} jour{jours > 1 ? "s" : ""}</span>
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="nom" className="mb-2 block">Nom complet</Label>
          <Input id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="telephone" className="mb-2 block">Téléphone</Label>
          <Input id="telephone" required value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email" className="mb-2 block">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {erreur && <p className="text-sm text-red-600">{erreur}</p>}

      <Button type="submit" disabled={envoi} className="w-full rounded-full bg-orange-500 py-6 text-base hover:bg-orange-600">
        {envoi ? "Envoi en cours..." : "Envoyer ma demande de réservation"}
      </Button>

      <p className="text-xs text-blue-900/60">
        Votre demande sera confirmée manuellement par notre équipe. Vous
        recevrez ensuite un lien pour verser l&apos;acompte via PayPal.
      </p>
    </form>
  );
}
