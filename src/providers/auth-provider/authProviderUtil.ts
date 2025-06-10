import { getCookie } from '@/api/cookies';
import { MyInfoResponse } from '@/types/user';
import { API_PATH } from '@/constants/apiPath';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';

//TODO: 추후 fetch함수 분리예정
export const fetchMyInfo = async (accessToken: string) => {
  if (!accessToken) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH.USER}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.json();
};

export async function getAuthOnServer() {
  const queryClient = getQueryClient();
  const accessToken = await getCookie('accessToken');
  let myInfo: MyInfoResponse | null = null;
  let isSignIn = false;

  try {
    if (accessToken) {
      const data = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY.MY_INFO],
        queryFn: () => fetchMyInfo(accessToken),
      });
      myInfo = data;
      isSignIn = true;
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    isSignIn = false;
    myInfo = null;
  }

  return {
    myInfo,
    isSignIn,
    accessToken,
    queryClient,
  };
}
