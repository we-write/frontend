'use server';
import { cookies } from 'next/headers';
export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
