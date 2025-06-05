import { GetTeamsParticipantsResponse } from '@/api/social-detail/type';

const extractUserImages = (
  data?: GetTeamsParticipantsResponse[] | null
): string[] => {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => item.User?.image)
    .filter((image): image is string => typeof image === 'string');
};

export default extractUserImages;
