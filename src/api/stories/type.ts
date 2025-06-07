export interface GetContentsProps {
  id: string;
  page: number;
  limit: number;
}

export interface PostContentParams {
  userId: number;
  storyId: string;
  content: string;
}

export interface GetApproveUserParams {
  contentId: string;
}

export interface ApproveContentParams {
  userId: number;
  contentId: string;
}
