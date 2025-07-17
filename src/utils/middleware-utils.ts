import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RedirectWithErrorParams {
  url: string;
  request: NextRequest;
}

const COOKIE_LIFE_TIME_SECONDS = 5;

const redirectWithError = ({ url, request }: RedirectWithErrorParams) => {
  const response = NextResponse.redirect(new URL(url, request.url));
  response.cookies.set('redirect_error', 'invalid_route', {
    path: '/',
    httpOnly: false,
    secure: true,
    maxAge: COOKIE_LIFE_TIME_SECONDS,
  });
  return response;
};

export default redirectWithError;
