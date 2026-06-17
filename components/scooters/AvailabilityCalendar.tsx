"use client";

import { useEffect, useState } from "react";
import { fr } from "date-fns/locale";
import { eachDayOfInterval, parseISO } from "date-fns";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Calendar } from "@/components/ui/calendar";

export function AvailabilityCalendar({ scooterId }: { scooterId: string }) {
  const [datesIndisponibles, setDatesIndisponibles] = useState<Date[]>([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function chargerDatesBloquees() {
      const [{ data: reservations }, { data: indisponibilites }] = await Promise.all([
        supabaseBrowser
          .from("reservations_dates_bloquees")
          .select("date_debut, date_fin")
          .eq("scooter_id", scooterId),
        supabaseBrowser
          .from("indisponibilites")
          .select("date_debut, date_fin")
          .eq("scooter_id", scooterId),
      ]);

      const periodes = [...(reservations ?? []), ...(indisponibilites ?? [])];

      const jours = periodes.flatMap((periode) =>
        eachDayOfInterval({
          start: parseISO(periode.date_debut),
          end: parseISO(periode.date_fin),
        })
      );

      setDatesIndisponibles(jours);
      setChargement(false);
    }

    chargerDatesBloquees();
  }, [scooterId]);

  if (chargement) {
    return (
      <div className="rounded-2xl border border-blue-900/10 p-6 text-sm text-blue-900/60">
        Chargement des disponibilités...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-900/10 bg-white p-2">
      <Calendar
        mode="multiple"
        locale={fr}
        disabled={[{ before: new Date() }, ...datesIndisponibles]}
        selected={[]}
        className="w-full"
      />
      <div className="flex items-center gap-2 px-4 pb-3 text-xs text-blue-900/60">
        <span className="inline-block size-3 rounded-full bg-blue-900/20" />
        Dates grisées = déjà réservées ou indisponibles
      </div>
    </div>
  );
}
