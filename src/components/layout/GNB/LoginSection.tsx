import { LoginSectionProps } from '@/components/layout/GNB/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../../../constants/appRoutes';
const SIGN_IN_IMAGE = '/assets/images/signin.png';

export const LoginSection = ({ isSignIn }: LoginSectionProps) => {
  const router = useRouter();
  const handleSignIn = () => {
    if (isSignIn) {
      router.push(APP_ROUTES.signout);
    } else {
      router.push(APP_ROUTES.signin);
    }
  };
  return (
    <button onClick={handleSignIn} className="hidden md:flex">
      {isSignIn ? (
        <Image src={SIGN_IN_IMAGE} alt="SIGN_IN_IMAGE" width={40} height={40} />
      ) : (
        <span className="text-write-main text-base font-semibold">로그인</span>
      )}
    </button>
  );
};
