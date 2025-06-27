export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ContentApproval: {
        Row: {
          approved_at: string;
          content_id: string;
          user_id: number;
        };
        Insert: {
          approved_at?: string;
          content_id?: string;
          user_id: number;
        };
        Update: {
          approved_at?: string;
          content_id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'ContentApproval_content_id_fkey';
            columns: ['content_id'];
            isOneToOne: false;
            referencedRelation: 'Contents';
            referencedColumns: ['content_id'];
          },
        ];
      };
      Contents: {
        Row: {
          content: string;
          content_id: string;
          created_at: string;
          merged_at: string | null;
          status: Database['public']['Enums']['content_status'];
          story_id: string;
          user_id: number;
        };
        Insert: {
          content: string;
          content_id?: string;
          created_at?: string;
          merged_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          story_id?: string;
          user_id: number;
        };
        Update: {
          content?: string;
          content_id?: string;
          created_at?: string;
          merged_at?: string | null;
          status?: Database['public']['Enums']['content_status'];
          story_id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Contents_story_id_fkey';
            columns: ['story_id'];
            isOneToOne: false;
            referencedRelation: 'Stories';
            referencedColumns: ['story_id'];
          },
        ];
      };
      contents_deleted_log: {
        Row: {
          content_id: string;
          created_at: string;
          deleted_at: string;
          log_id: number;
          story_id: string;
        };
        Insert: {
          content_id: string;
          created_at: string;
          deleted_at?: string;
          log_id?: number;
          story_id: string;
        };
        Update: {
          content_id?: string;
          created_at?: string;
          deleted_at?: string;
          log_id?: number;
          story_id?: string;
        };
        Relationships: [];
      };
      Stories: {
        Row: {
          approval_period: number | null;
          approved_count: number;
          capacity: number | null;
          cover_image_url: string | null;
          created_at: string;
          genre: string;
          is_public: boolean | null;
          max_length: number;
          social_id: number;
          story_id: string;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          approval_period?: number | null;
          approved_count: number;
          capacity?: number | null;
          cover_image_url?: string | null;
          created_at?: string;
          genre: string;
          is_public?: boolean | null;
          max_length: number;
          social_id: number;
          story_id?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          approval_period?: number | null;
          approved_count?: number;
          capacity?: number | null;
          cover_image_url?: string | null;
          created_at?: string;
          genre?: string;
          is_public?: boolean | null;
          max_length?: number;
          social_id?: number;
          story_id?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      story_collaborators: {
        Row: {
          id: number;
          joined_at: string;
          role: Database['public']['Enums']['user_role'];
          story_id: string;
          user_id: number;
          user_name: string | null;
        };
        Insert: {
          id?: number;
          joined_at?: string;
          role?: Database['public']['Enums']['user_role'];
          story_id?: string;
          user_id: number;
          user_name?: string | null;
        };
        Update: {
          id?: number;
          joined_at?: string;
          role?: Database['public']['Enums']['user_role'];
          story_id?: string;
          user_id?: number;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'User_story_id_fkey';
            columns: ['story_id'];
            isOneToOne: false;
            referencedRelation: 'Stories';
            referencedColumns: ['story_id'];
          },
        ];
      };
      story_likes: {
        Row: {
          id: number;
          liked_at: string;
          story_id: string;
          user_id: number;
        };
        Insert: {
          id?: number;
          liked_at?: string;
          story_id: string;
          user_id: number;
        };
        Update: {
          id?: number;
          liked_at?: string;
          story_id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'story_likes_story_id_fkey';
            columns: ['story_id'];
            isOneToOne: false;
            referencedRelation: 'Stories';
            referencedColumns: ['story_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_expired_contents: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      delete_expired_contents_test: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      delete_expired_contents_with_log: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      content_status: 'WRITING' | 'PENDING' | 'MERGED';
      user_role: 'LEADER' | 'MEMBER' | 'GUEST';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      content_status: ['WRITING', 'PENDING', 'MERGED'],
      user_role: ['LEADER', 'MEMBER', 'GUEST'],
    },
  },
} as const;
