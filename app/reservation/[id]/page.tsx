import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { ReservationForm } from "@/components/reservation/ReservationForm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Réserver — TetouanScoot",
};

async function getScooter(id: string) {
  const { data } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("id", id)
    .eq("actif", true)
    .single();

  return data as Scooter | null;
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scooter = await getScooter(id);

  if (!scooter) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-950">Réserver le {scooter.nom}</h1>
      <p className="mt-2 text-zinc-800/70">
        {scooter.prix_jour} MAD / jour · Caution {scooter.caution} MAD
      </p>

      <div className="mt-8">
        <ReservationForm scooter={scooter} />
      </div>
    </div>
  );
}
