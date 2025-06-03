export interface StoryEntity {
  social_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre?: string;
  created_at: string;
  updated_at: string;
  approved_count: number;
  max_length: number;
  is_public: boolean;
  approval_period: number;
}

export type CreateStoryRequest = Omit<
  StoryEntity,
  'summary' | 'created_at' | 'updated_at'
>;
