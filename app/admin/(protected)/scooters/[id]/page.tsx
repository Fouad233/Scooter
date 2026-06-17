import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Scooter } from "@/lib/types";
import { ScooterForm } from "@/components/admin/ScooterForm";

export const revalidate = 0;

export default async function ModifierScooterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: scooter } = await supabaseServer
    .from("scooters")
    .select("*")
    .eq("id", id)
    .single();

  if (!scooter) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Modifier {scooter.nom}</h1>
      <div className="mt-6">
        <ScooterForm scooter={scooter as Scooter} />
      </div>
    </div>
  );
}
