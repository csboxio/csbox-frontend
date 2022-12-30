export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    first_name: string | null
                    last_name: string | null
                    password?: string | null
                    avatar_url: string | null
                    website: string | null
                    country: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    first_name: string | null
                    last_name: string | null
                    password?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    country: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    first_name: string | null
                    last_name: string | null
                    password?: string | null
                    avatar_url?: string | null
                    website?: string | null
                    country: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}