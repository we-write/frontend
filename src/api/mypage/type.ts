export interface DeleteCollaboratorFromSocialParams {
  userId: number;
  storyId: string;
}

export interface GetCollaboratorCountMapParams {
  storyIds: string[];
}

export interface GetMySocialListParams {
  userId: number;
  offset: number;
  limit: number;
}
