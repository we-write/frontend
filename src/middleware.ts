import { APP_ROUTES } from '@/constants/appRoutes';
import redirectWithError from '@/utils/middleware-utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const isSignIn = Boolean(accessToken);

  const isAuthPage =
    pathname === APP_ROUTES.signin || pathname === APP_ROUTES.signup;
  const isProtectedPage = pathname === APP_ROUTES.mypage;

  const referer = request.headers.get('referer') ?? '';
  const isFromSignIn = referer.includes(APP_ROUTES.signin);

  if (isProtectedPage && !isSignIn) {
    return redirectWithError({ url: APP_ROUTES.signin, request });
  }

  if (isAuthPage && isSignIn && !isFromSignIn) {
    return redirectWithError({ url: APP_ROUTES.home, request });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/auths/signin', '/auths/signup', '/mypage'],
};

export default middleware;
