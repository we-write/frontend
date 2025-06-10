'use client';

import MyProfile from './myProfile/MyProfile';
import MySocialList from '@/app/mypage/mySocial/MySocialList';
import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';

const MyPage = () => {
  const { isSignIn } = useAuth();
  if (!isSignIn) return redirect(APP_ROUTES.signin);

  return (
    <section className="mx-auto mt-4 w-[343px] md:w-[696px] lg:w-[996px]">
      <h1 className="text-write-main text-2xl font-semibold">마이 페이지</h1>
      <MyProfile />
      <MySocialList />
    </section>
  );
};

export default MyPage;
