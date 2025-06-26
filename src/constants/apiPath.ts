export const API_PATH = {
  SIGN_IN: 'auths/signin',
  SIGN_UP: 'auths/signup',
  USER: 'auths/user',
  SIGN_OUT: 'auths/signout',
  SOCIAL: '/gatherings',
  SOCIAL_CANCEL: (socialId: number) => `/gatherings/${socialId}/cancel`,
};

export const DB_PATH = {
  STORY_COLLABORATORS: 'story_collaborators',
};
