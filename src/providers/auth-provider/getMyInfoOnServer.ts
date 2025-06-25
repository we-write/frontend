import { getCookie } from '@/api/cookies';
import { MyInfoResponse } from '@/api/auth/type';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';
import { AuthProviderServerState } from './type';
import { getMyInfo } from '@/api/auth/api';
import handleError from '@/utils/error';

const getMyInfoOnServer = async () => {
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

  try {
    const data = await queryClient.fetchQuery<MyInfoResponse>({
      queryKey: [QUERY_KEY.MY_INFO],
      queryFn: () => getMyInfo(accessToken),
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
