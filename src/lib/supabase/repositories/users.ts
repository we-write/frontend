'use server';
import { SignUpRequest, SigninRequest } from '@/api/auth/type';
import instanceBaaS from '@/api/instanceBaaS';
import { cookies } from 'next/headers';

export const createUser = async (user: SignUpRequest) => {
  const { data, error } = await instanceBaaS.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
        favorite: user.favorite,
      },
    },
  });
  await instanceBaaS.from('users').insert({
    email: user.email,
    name: user.name,
    favorite: user.favorite,
    image: null,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signin = async (user: SigninRequest) => {
  const { data, error } = await instanceBaaS.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  const cookieStore = await cookies();
  cookieStore.set('access_token', data.session.access_token);
  cookieStore.set('refresh_token', data.session.refresh_token);
  return data;
};

export const signout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
};

export const getUserInfo = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');
  if (!accessToken || !refreshToken) {
    return null;
  }
  const { data, error } = await instanceBaaS.auth.getUser(accessToken.value);
  const { data: user, error: userError } = await instanceBaaS
    .from('users')
    .select('*')
    .eq('email', data.user?.email ?? '');
  if (error) {
    throw new Error(error.message);
  }
  if (userError) {
    throw new Error(userError.message);
  }
  return user;
};
