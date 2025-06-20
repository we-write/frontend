import { useQuery } from '@tanstack/react-query';
import { getStoryId } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { GetSocialResponse } from '@/api/social/type';

const useGetStoryIdList = (socialList: GetSocialResponse[]) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.SOCIAL_GET_STORY_ID,
      socialList.map((item) => item.id),
    ],
    queryFn: async () => {
      const storyIds = await Promise.all(
        socialList.map(async (item) => {
          const storyId = await getStoryId({ socialId: Number(item.id) });
          return { [item.id]: storyId };
        })
      );
      return storyIds;
    },
    select: (data) => {
      return data.map((item) => {
        const value = Object.values(item)[0];
        // value가 객체인 경우 story_id 속성 추출, 문자열인 경우 그대로 반환
        if (
          typeof value === 'object' &&
          value !== null &&
          'story_id' in value
        ) {
          return value.story_id;
        }
        return value;
      });
    },
    enabled: !!socialList.length,
  });
};

export default useGetStoryIdList;
