export interface DBStoryResponse {
  story_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre?: string;
  created_at: string;
  updated_at: string;
  approved_count: number;
}

export interface DBContentResponse {
  content_id: string;
  content: string;
  user_id: string;
  // MEMO: 응답필드 추가했음
  merged_at: string;
  created_at: string;
  status: string;
  story_id: string;
}
