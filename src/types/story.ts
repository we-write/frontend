export interface Story {
  story_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre?: string;
  created_at: string;
  updated_at: string;
  approved_count: number;
}
