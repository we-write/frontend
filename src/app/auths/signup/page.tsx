import getMyInfoOnServer from '@/providers/auth-provider/getMyInfoOnServer';
import SignupForm from './_components/SignupForm';
import LinkToSignIn from './_components/LinkToSignIn';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - WeWrite',
  description:
    'WeWrite에 계정을 만들면 스토리그룹 참여, 좋아요 남기기 등 다양한 서비스를 이용할 수 있습니다.',
  robots: { index: false },
};

const SignUp = async () => {
  const { isSignIn } = await getMyInfoOnServer();
  const referer = (await headers()).get('referer');

  if (isSignIn) {
    redirect(referer ?? '/');
  }

  return (
    <div className="mt-6 flex h-screen w-full items-center justify-center">
      <div className="flex min-h-[680px] w-[343px] flex-col gap-10 rounded-3xl bg-white px-4 py-6 md:w-[608px] md:px-16 lg:min-h-[710px] lg:w-[508px]">
        <h1 className={`text-write-main text-center text-xl font-bold`}>
          회원가입
        </h1>
        <SignupForm />
        <LinkToSignIn />
      </div>
    </div>
  );
};
export default SignUp;
