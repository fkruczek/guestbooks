export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      entries: {
        Row: {
          created_at: string | null
          email: string | null
          guestbookId: number | null
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          guestbookId?: number | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          guestbookId?: number | null
          id?: number
          message?: string | null
          name?: string | null
        }
      }
      guestbooks: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
