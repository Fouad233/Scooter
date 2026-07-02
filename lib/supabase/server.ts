import { createClient } from "@supabase/supabase-js";

// Clé service role : contourne toutes les politiques RLS.
// À utiliser uniquement dans les routes admin authentifiées.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Clé anon : respecte les politiques RLS Supabase.
// À utiliser pour les endpoints publics (lecture de scooters, vue reservations_dates_bloquees).
export const supabaseAnon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
