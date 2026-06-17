import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { ScooterSpecs } from "@/components/scooters/ScooterSpecs";
import { AvailabilityCalendar } from "@/components/scooters/AvailabilityCalendar";

export const revalidate = 0;

async function getScooter(id: string) {
  const { data } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("id", id)
    .eq("actif", true)
    .single();

  return data as Scooter | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scooter = await getScooter(id);

  if (!scooter) return { title: "Scooter introuvable — TetouanScoot" };

  return {
    title: `${scooter.nom} — TetouanScoot`,
    description: scooter.description ?? undefined,
  };
}

export default async function ScooterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scooter = await getScooter(id);

  if (!scooter) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-blue-900/5 text-blue-900/30">
          Photo à venir
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-950">{scooter.nom}</h1>
          <p className="mt-1 text-blue-900/60">{scooter.modele}</p>

          {scooter.description && (
            <p className="mt-4 text-blue-900/80">{scooter.description}</p>
          )}

          <div className="mt-6">
            <ScooterSpecs scooter={scooter} />
          </div>

          <Link
            href={`/reservation/${scooter.id}`}
            className="mt-6 inline-block w-full rounded-full bg-orange-500 px-6 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-orange-600 sm:w-auto"
          >
            Réserver ce scooter
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-blue-950">Disponibilités</h2>
        <p className="mt-1 text-sm text-blue-900/60">
          Consultez les dates déjà réservées avant de faire votre demande.
        </p>
        <div className="mt-4">
          <AvailabilityCalendar scooterId={scooter.id} />
        </div>
      </div>
    </div>
  );
}
