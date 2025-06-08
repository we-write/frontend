export const TEAM_USER_ROLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
  GUEST: 'GUEST',
} as const;

export type TeamUserRole = (typeof TEAM_USER_ROLE)[keyof typeof TEAM_USER_ROLE];
