import SignInForm from './_components/SignInForm';
import getMyInfoOnServer from '@/providers/auth-provider/getMyInfoOnServer';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import LinkToSignUp from './_components/LinkToSignUp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - WeWrite',
  description:
    'WeWrite에 로그인하면 스토리그룹 참여, 좋아요 남기기 등 다양한 서비스를 이용할 수 있습니다.',
  robots: { index: false },
  openGraph: {
    title: '로그인 - WeWrite',
    description:
      'WeWrite에 로그인하면 스토리그룹 참여, 좋아요 남기기 등 다양한 서비스를 이용할 수 있습니다.',
    siteName: 'WeWrite',
    images: [
      {
        url: 'https://i.imgur.com/RR3PYKv.png',
        width: 1200,
        height: 630,
        alt: 'WeWrite 타이틀 이미지',
      },
    ],
  },
};

const SignIn = async () => {
  const { isSignIn } = await getMyInfoOnServer();
  const referer = (await headers()).get('referer');

  if (isSignIn) {
    redirect(referer ?? '/');
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex max-h-[478px] w-[343px] flex-col gap-10 rounded-3xl bg-white px-4 py-6 sm:px-4 md:w-[608px] md:px-13 lg:max-h-[478px] lg:w-[508px]">
        <h1 className="text-write-main text-center text-xl font-bold">
          로그인
        </h1>

        <SignInForm />
        <LinkToSignUp />
      </div>
    </div>
  );
};

export default SignIn;
