import type { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1 },
    { url: `${siteUrl}/scooters`, priority: 0.9 },
    { url: `${siteUrl}/tarifs`, priority: 0.7 },
    { url: `${siteUrl}/contact`, priority: 0.5 },
    { url: `${siteUrl}/mentions-legales`, priority: 0.1 },
    { url: `${siteUrl}/cgl`, priority: 0.1 },
    { url: `${siteUrl}/confidentialite`, priority: 0.1 },
  ];

  const { data: scooters } = await supabaseServer
    .from("scooters")
    .select("id, created_at")
    .eq("actif", true);

  const pagesScooters: MetadataRoute.Sitemap = (scooters ?? []).map((scooter) => ({
    url: `${siteUrl}/scooters/${scooter.id}`,
    lastModified: scooter.created_at,
    priority: 0.8,
  }));

  return [...pagesStatiques, ...pagesScooters];
}
