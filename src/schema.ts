export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
    public: {
        Tables: {
            courses: {
                Row: {
                    id: string
                    course_image_url: string | null
                    course_title: string | null
                    course_prefix: string | null
                    course_number: string | null
                    course_term: string | null
                    inserted_at: string | null
                    slug: string | null
                    created_by: string | null
                }
                Insert: {
                    id: string
                    course_image_url: string | null
                    course_title: string | null
                    course_prefix: string | null
                    course_number: string | null
                    course_term: string | null
                    inserted_at: string | null
                    slug: string | null
                    created_by: string | null
                }
                Update: {
                    id: string
                    course_image_url: string | null
                    course_title: string | null
                    course_prefix: string | null
                    course_number: string | null
                    course_term: string | null
                    inserted_at: string | null
                    slug: string | null
                    created_by: string | null
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
            users: {
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