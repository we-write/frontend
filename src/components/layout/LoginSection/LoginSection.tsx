import LoginSectionProps from '@/components/layout/LoginSection/type';
import Image from 'next/image';

const SIGN_IN_IMAGE = '/assets/images/signin.png';

export default function LoginSection({ isSignIn }: LoginSectionProps) {
  const handleSignIn = () => {
    if (isSignIn) {
      window.location.href = '/auths/signout';
    } else {
      window.location.href = '/auths/signin';
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
}
