import { createClient } from "@supabase/supabase-js";

// Client utilisable dans les composants navigateur ("use client").
// N'utilise que la clé publique "anon" : jamais la service role ici.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
