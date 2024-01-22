import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './schema.ts'

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>
            getSession(): Promise<Session | null>
            getClaim(): Promise<Session | null>
            getLMSUserID(): Promise<Session | null>
            getServerSession(): Promise<Session | null>
        }
        interface PageData {
            session: Session | null
        }
        // interface Error {}
        // interface Platform {}
    }
}