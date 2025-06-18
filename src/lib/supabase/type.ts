import { PostgrestError } from '@supabase/supabase-js';

export type SupabaseResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

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
      content_status: 'WRITNG' | 'PENDING' | 'MERGED';
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
      content_status: ['WRITNG', 'PENDING', 'MERGED'],
      user_role: ['LEADER', 'MEMBER', 'GUEST'],
    },
  },
} as const;

// ===== 테이블명 상수 =====
export const TABLE_NAMES = {
  STORIES: 'Stories',
  CONTENTS: 'Contents',
  STORY_COLLABORATORS: 'story_collaborators',
  CONTENT_APPROVAL: 'ContentApproval',
  CONTENTS_DELETED_LOG: 'contents_deleted_log',
} as const;

// ===== 컬럼명 상수 =====
export const COLUMN_NAMES = {
  STORIES: {
    STORY_ID: 'story_id',
    TITLE: 'title',
    SUMMARY: 'summary',
    GENRE: 'genre',
    SOCIAL_ID: 'social_id',
    COVER_IMAGE_URL: 'cover_image_url',
    IS_PUBLIC: 'is_public',
    MAX_LENGTH: 'max_length',
    APPROVAL_PERIOD: 'approval_period',
    APPROVED_COUNT: 'approved_count',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
  },
  CONTENTS: {
    CONTENT_ID: 'content_id',
    STORY_ID: 'story_id',
    USER_ID: 'user_id',
    CONTENT: 'content',
    STATUS: 'status',
    CREATED_AT: 'created_at',
    MERGED_AT: 'merged_at',
  },
  STORY_COLLABORATORS: {
    ID: 'id',
    STORY_ID: 'story_id',
    USER_ID: 'user_id',
    USER_NAME: 'user_name',
    ROLE: 'role',
    JOINED_AT: 'joined_at',
  },
  CONTENT_APPROVAL: {
    CONTENT_ID: 'content_id',
    USER_ID: 'user_id',
    APPROVED_AT: 'approved_at',
  },
  CONTENTS_DELETED_LOG: {
    LOG_ID: 'log_id',
    CONTENT_ID: 'content_id',
    STORY_ID: 'story_id',
    CREATED_AT: 'created_at',
    DELETED_AT: 'deleted_at',
  },
} as const;

// ===== 테이블별 타입 정의 =====
export type Story = Tables<'Stories'>;
export type StoryInsert = TablesInsert<'Stories'>;
export type StoryUpdate = TablesUpdate<'Stories'>;

export type Content = Tables<'Contents'>;
export type ContentInsert = TablesInsert<'Contents'>;
export type ContentUpdate = TablesUpdate<'Contents'>;

export type StoryCollaborator = Tables<'story_collaborators'>;
export type StoryCollaboratorInsert = TablesInsert<'story_collaborators'>;
export type StoryCollaboratorUpdate = TablesUpdate<'story_collaborators'>;

export type ContentApproval = Tables<'ContentApproval'>;
export type ContentApprovalInsert = TablesInsert<'ContentApproval'>;
export type ContentApprovalUpdate = TablesUpdate<'ContentApproval'>;

export type ContentsDeletedLog = Tables<'contents_deleted_log'>;
export type ContentsDeletedLogInsert = TablesInsert<'contents_deleted_log'>;
export type ContentsDeletedLogUpdate = TablesUpdate<'contents_deleted_log'>;

// ===== Enum 타입 =====
export type ContentStatus = Enums<'content_status'>;
export type UserRole = Enums<'user_role'>;
