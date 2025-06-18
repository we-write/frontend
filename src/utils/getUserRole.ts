import { DBStoryCollaboratorsResponse } from '@/types/dbStory';

interface getUserRoleParams {
  storyCollaboratorsData: DBStoryCollaboratorsResponse[];
  currentUserId: number;
}

const getUserRole = ({
  storyCollaboratorsData,
  currentUserId,
}: getUserRoleParams) => {
  const found = storyCollaboratorsData.find((c) => c.user_id === currentUserId);
  return found ? found.role : 'GUEST';
};

export default getUserRole;
