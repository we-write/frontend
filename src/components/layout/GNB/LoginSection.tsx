'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../../../constants/appRoutes';
import { DefaultProfileImage } from '@public/assets/icons';
import { UserResponse } from '@/types/user';
const SIGN_IN_IMAGE = '/assets/images/signin.png';

export const LoginSection = ({
  isSignIn,
  userInfo,
}: {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    if (isSignIn) {
      router.push(APP_ROUTES.mypage);
    } else {
      router.push(APP_ROUTES.signin);
    }
  };
  return (
    <button onClick={handleSignIn} className="hidden md:flex">
      {userInfo ? (
        userInfo.image ? (
          <Image
            src={SIGN_IN_IMAGE}
            alt="SIGN_IN_IMAGE"
            width={40}
            height={40}
          />
        ) : (
          <DefaultProfileImage width={40} height={40} />
        )
      ) : (
        <span className="text-write-main text-base font-semibold">로그인</span>
      )}
    </button>
  );
};
