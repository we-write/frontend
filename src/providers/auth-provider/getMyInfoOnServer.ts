import { getCookie } from '@/api/cookies';
import { UserInfoResponse } from '@/api/auth/type';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';
import { AuthProviderServerState } from './type';

import handleError from '@/utils/error';
import { getUserInfo } from '@/lib/supabase/repositories/users';

const getMyInfoOnServer = async () => {
  const queryClient = getQueryClient();
  const accessToken = await getCookie('access_token');

  const initialState: AuthProviderServerState = {
    myInfo: undefined,
    isSignIn: false,
    accessToken: accessToken,
    queryClient,
  };

  if (!accessToken) {
    return initialState;
  }

  try {
    const data = await queryClient.fetchQuery<UserInfoResponse>({
      queryKey: [QUERY_KEY.MY_INFO],
      queryFn: async () => {
        const data = await getUserInfo();
        if (!data) {
          throw new Error('User not found');
        }
        return data;
      },
      //getMyInfo(accessToken),
    });
    return {
      ...initialState,
      myInfo: data,
      isSignIn: true,
    };
  } catch (error) {
    handleError(error);
  }

  return initialState;
};
export default getMyInfoOnServer;
