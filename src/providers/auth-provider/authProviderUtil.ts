import { getCookie } from '@/api/cookies';
import { MyInfoResponse } from '@/types/user';
import { API_PATH } from '@/constants/apiPath';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';
import { QueryClient } from '@tanstack/react-query';

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

//TODO:컨벤션 리팩토링 병합 후 분리 예정
export interface AuthProviderState {
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  accessToken: string | undefined;
  queryClient: QueryClient;
}

export const getMyInfoOnServer = async () => {
  const queryClient = getQueryClient();
  const accessToken = await getCookie('accessToken');

  const initialState: AuthProviderState = {
    myInfo: undefined,
    isSignIn: false,
    accessToken: accessToken,
    queryClient,
  };

  try {
    if (accessToken) {
      const data = await queryClient.fetchQuery<MyInfoResponse>({
        queryKey: [QUERY_KEY.MY_INFO],
        queryFn: () => fetchMyInfo(accessToken),
        retry: false,
      });

      return {
        ...initialState,
        myInfo: data,
        isSignIn: true,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return initialState;
};
