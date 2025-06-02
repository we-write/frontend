export interface DB_Story_Response {
  story_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre?: string;
  created_at: string;
  updated_at: string;
  approved_count: number;
}

export interface DB_Content_Response {
  content_id: string;
  content: string;
  user_id: string;
}
