import type { PrismaClient } from "@prisma/client";
import { SupabaseClient, Session } from '@supabase/supabase-js'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient,
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: import("@supabase/supabase-js").Session | null
		}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

export {};
