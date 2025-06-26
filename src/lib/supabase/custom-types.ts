import {
  Enums,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/lib/supabase/database.types';
import { PostgrestError } from '@supabase/supabase-js';

export type SupabaseResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

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
