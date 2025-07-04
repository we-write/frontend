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
  STORY_LIKES: 'story_likes',
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
  STORY_LIKES: {
    USER_ID: 'user_id',
    STORY_ID: 'story_id',
    LIKED_AT: 'liked_at',
    ID: 'id',
  },
} as const;
