import { getCookie } from '@/api/cookies';
import { MyInfoResponse } from '@/api/auth/type';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';
import { AuthProviderServerState } from './type';
import { getMyInfo } from '@/api/auth/api';

export const getMyInfoOnServer = async () => {
  const queryClient = getQueryClient();
  const accessToken = await getCookie('accessToken');

  const initialState: AuthProviderServerState = {
    myInfo: undefined,
    isSignIn: false,
    accessToken: accessToken,
    queryClient,
  };

  if (!accessToken) {
    return initialState;
  }

  const data = await queryClient.prefetchQuery<MyInfoResponse>({
    queryKey: [QUERY_KEY.MY_INFO],
    queryFn: () => getMyInfo(accessToken),
    retry: false,
  });

  return {
    ...initialState,
    myInfo: data,
    isSignIn: true,
  };
};
