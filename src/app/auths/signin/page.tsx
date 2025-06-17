import SignInForm from './_components/SignInForm';
import { getMyInfoOnServer } from '@/providers/auth-provider/authProviderUtil';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import LinkComponent from './_components/LinkComponent';

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
        <LinkComponent />
      </div>
    </div>
  );
};

export default SignIn;
