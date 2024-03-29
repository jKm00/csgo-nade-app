// See https://kit.svelte.dev/docs/types#app
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './schema';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			supabaseAdmin: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
	var prisma: PrismaClient;
}

export {};
