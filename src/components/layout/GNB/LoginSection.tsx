'use client';

import Image from 'next/image';
import { APP_ROUTES } from '../../../constants/appRoutes';
import { DefaultProfileImage } from '@public/assets/icons';
import useBoolean from '@/hooks/useBoolean';
import useClickOutside from '@/hooks/useClickOutside';
import { usePostSignout } from '@/hooks/api/auth/usePostSignout';
import UserDropdown from '@/components/layout/GNB/UserDropdown';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import useReferer from '@/hooks/useReferer';

const LoginSection = () => {
  const { mutate: signOut } = usePostSignout();
  const { isSignIn, myInfo } = useAuth();
  const { refererParam } = useReferer();

  const {
    value: isDropdownOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean();
  const ref = useClickOutside(closeDropdown);

  const handleSignOut = () => {
    signOut();
    closeDropdown();
  };

  return (
    <div ref={ref} className="relative hidden md:flex">
      {myInfo && isSignIn ? (
        <button
          onClick={openDropdown}
          className="items-center justify-center"
          aria-label="유저 메뉴 열기"
        >
          {myInfo.image ? (
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-300">
              <Image
                src={myInfo.image}
                alt="프로필 이미지"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <DefaultProfileImage width={40} height={40} />
          )}
        </button>
      ) : (
        <Link
          href={`${APP_ROUTES.signin}?${refererParam}`}
          className="text-write-main text-base font-semibold"
        >
          로그인
        </Link>
      )}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 z-10">
          <UserDropdown onSignOut={handleSignOut} onClose={closeDropdown} />
        </div>
      )}
    </div>
  );
};

export default LoginSection;
