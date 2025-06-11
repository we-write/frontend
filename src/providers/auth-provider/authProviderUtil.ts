import { getCookie } from '@/api/cookies';
import { MyInfoResponse } from '@/api/auth/type';
import { API_PATH } from '@/constants/apiPath';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';

//TODO: 추후 fetch함수 분리예정
export const fetchMyInfo = async (accessToken: string) => {
  if (!accessToken) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH.USER}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch user info');
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const getMyInfoOnServer = async () => {
  const queryClient = getQueryClient();
  const accessToken = await getCookie('accessToken');
  let myInfo: MyInfoResponse | undefined = undefined;
  let isSignIn = false;

  try {
    if (accessToken) {
      const data = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY.MY_INFO],
        queryFn: () => fetchMyInfo(accessToken),
        retry: false,
      });
      myInfo = data;
      isSignIn = true;
    }
  } catch (error) {
    console.error(error);
    isSignIn = false;
    myInfo = undefined;
  }

  return {
    myInfo,
    isSignIn,
    accessToken,
    queryClient,
  };
};
