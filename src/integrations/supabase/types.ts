export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      content_items: {
        Row: {
          content_type: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          display_order: number | null
          engagement_rate: number | null
          external_url: string | null
          id: string
          likes: number | null
          platform: string | null
          thumbnail_url: string | null
          title_ar: string
          title_en: string
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          engagement_rate?: number | null
          external_url?: string | null
          id?: string
          likes?: number | null
          platform?: string | null
          thumbnail_url?: string | null
          title_ar: string
          title_en: string
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          engagement_rate?: number | null
          external_url?: string | null
          id?: string
          likes?: number | null
          platform?: string | null
          thumbnail_url?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      portfolio_config: {
        Row: {
          bio_ar: string | null
          bio_en: string | null
          career_evolution_desc_ar: string | null
          career_evolution_desc_en: string | null
          career_evolution_title_ar: string | null
          career_evolution_title_en: string | null
          cooperative_approach_desc_ar: string | null
          cooperative_approach_desc_en: string | null
          cooperative_approach_title_ar: string | null
          cooperative_approach_title_en: string | null
          created_at: string
          cv_url: string | null
          email: string | null
          github_url: string | null
          global_perspective_desc_ar: string | null
          global_perspective_desc_en: string | null
          global_perspective_title_ar: string | null
          global_perspective_title_en: string | null
          hero_subtitle_ar: string | null
          hero_subtitle_en: string | null
          hero_title_1_ar: string | null
          hero_title_1_en: string | null
          hero_title_2_ar: string | null
          hero_title_2_en: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          location: string | null
          name: string | null
          phone: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          username: string | null
          whatsapp_link: string | null
          work_section_bg_url: string | null
          youtube_url: string | null
        }
        Insert: {
          bio_ar?: string | null
          bio_en?: string | null
          career_evolution_desc_ar?: string | null
          career_evolution_desc_en?: string | null
          career_evolution_title_ar?: string | null
          career_evolution_title_en?: string | null
          cooperative_approach_desc_ar?: string | null
          cooperative_approach_desc_en?: string | null
          cooperative_approach_title_ar?: string | null
          cooperative_approach_title_en?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string | null
          github_url?: string | null
          global_perspective_desc_ar?: string | null
          global_perspective_desc_en?: string | null
          global_perspective_title_ar?: string | null
          global_perspective_title_en?: string | null
          hero_subtitle_ar?: string | null
          hero_subtitle_en?: string | null
          hero_title_1_ar?: string | null
          hero_title_1_en?: string | null
          hero_title_2_ar?: string | null
          hero_title_2_en?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          whatsapp_link?: string | null
          work_section_bg_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          bio_ar?: string | null
          bio_en?: string | null
          career_evolution_desc_ar?: string | null
          career_evolution_desc_en?: string | null
          career_evolution_title_ar?: string | null
          career_evolution_title_en?: string | null
          cooperative_approach_desc_ar?: string | null
          cooperative_approach_desc_en?: string | null
          cooperative_approach_title_ar?: string | null
          cooperative_approach_title_en?: string | null
          created_at?: string
          cv_url?: string | null
          email?: string | null
          github_url?: string | null
          global_perspective_desc_ar?: string | null
          global_perspective_desc_en?: string | null
          global_perspective_title_ar?: string | null
          global_perspective_title_en?: string | null
          hero_subtitle_ar?: string | null
          hero_subtitle_en?: string | null
          hero_title_1_ar?: string | null
          hero_title_1_en?: string | null
          hero_title_2_ar?: string | null
          hero_title_2_en?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          whatsapp_link?: string | null
          work_section_bg_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_coming_soon: boolean | null
          project_url: string | null
          role: string | null
          stack: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_coming_soon?: boolean | null
          project_url?: string | null
          role?: string | null
          stack?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_coming_soon?: boolean | null
          project_url?: string | null
          role?: string | null
          stack?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          cta_link: string | null
          cta_text_ar: string | null
          cta_text_en: string | null
          description_ar: string | null
          description_en: string | null
          display_order: number | null
          features_ar: string[] | null
          features_en: string[] | null
          icon: string | null
          id: string
          is_external: boolean | null
          price_ar: string | null
          price_en: string | null
          timeline_ar: string | null
          timeline_en: string | null
          title_ar: string
          title_en: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cta_link?: string | null
          cta_text_ar?: string | null
          cta_text_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          features_ar?: string[] | null
          features_en?: string[] | null
          icon?: string | null
          id?: string
          is_external?: boolean | null
          price_ar?: string | null
          price_en?: string | null
          timeline_ar?: string | null
          timeline_en?: string | null
          title_ar: string
          title_en: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cta_link?: string | null
          cta_text_ar?: string | null
          cta_text_en?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          features_ar?: string[] | null
          features_en?: string[] | null
          icon?: string | null
          id?: string
          is_external?: boolean | null
          price_ar?: string | null
          price_en?: string | null
          timeline_ar?: string | null
          timeline_en?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          display_order: number | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string
          description_ar: string | null
          description_en: string | null
          display_order: number | null
          id: string
          label_ar: string
          label_en: string
          stat_key: string
          updated_at: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          id?: string
          label_ar: string
          label_en: string
          stat_key: string
          updated_at?: string
          user_id: string
          value: string
        }
        Update: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          id?: string
          label_ar?: string
          label_en?: string
          stat_key?: string
          updated_at?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          client_name: string
          client_title_ar: string | null
          client_title_en: string | null
          content_ar: string
          content_en: string
          created_at: string
          display_order: number | null
          id: string
          rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          client_name: string
          client_title_ar?: string | null
          client_title_en?: string | null
          content_ar: string
          content_en: string
          created_at?: string
          display_order?: number | null
          id?: string
          rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          client_name?: string
          client_title_ar?: string | null
          client_title_en?: string | null
          content_ar?: string
          content_en?: string
          created_at?: string
          display_order?: number | null
          id?: string
          rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
