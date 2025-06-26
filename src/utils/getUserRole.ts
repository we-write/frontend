import { Database } from '@/lib/supabase/database.types';

interface getUserRoleParams {
  storyCollaboratorsData: Database['public']['Tables']['story_collaborators']['Row'][];
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
