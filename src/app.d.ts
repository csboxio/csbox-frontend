// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Session } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./schema.js";

declare global {
    declare namespace App {

        interface Locals {
            supabase: SupabaseClient<Database>
            getSession(): Promise<Session | null>


        }
        interface Supabase {
            Database: import('./schema').Database;

            SchemaName: 'public';
        }
        interface PageData {
            session: Session | null
        }

        declare module '@fortawesome/pro-solid-svg-icons/index.es' {
            export * from '@fortawesome/pro-solid-svg-icons';
        }
    }
}