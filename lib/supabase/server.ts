import { createClient } from "@supabase/supabase-js";

// Client utilisable uniquement côté serveur (route handlers, server components).
// Utilise la clé "service role" qui contourne les règles RLS : ne jamais l'exposer au navigateur.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
