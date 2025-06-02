import { GetTeamsParticipantsResponse } from '@/api/social-detail/type';

const extractUserImages = (data: GetTeamsParticipantsResponse[]): string[] => {
  return data
    .map((item) => item.User?.image)
    .filter((image): image is string => typeof image === 'string');
};

export default extractUserImages;
