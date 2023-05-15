import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // FIXME: Calling this method breaks the authentication
  const fetchVersion = async () => {
    const res = await fetch('/api/versions')
    const version = await res.json()
    return version
  }

  return {
    supabase,
    session
  }
};