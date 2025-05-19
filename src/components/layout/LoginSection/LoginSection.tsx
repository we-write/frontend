import LoginSectionProps from '@/components/layout/LoginSection/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SIGN_IN_IMAGE = '/assets/images/signin.png';

export const LoginSection = ({ isSignIn }: LoginSectionProps) => {
  const router = useRouter();
  const handleSignIn = () => {
    if (isSignIn) {
      router.push('/auths/signout');
    } else {
      router.push('/auths/signin');
    }
  };
  return (
    <button className="cursor-pointer" onClick={handleSignIn}>
      {isSignIn ? (
        <Image src={SIGN_IN_IMAGE} alt="SIGN_IN_IMAGE" width={40} height={40} />
      ) : (
        <span className="text-write-main text-base font-[600]">로그인</span>
      )}
    </button>
  );
};
