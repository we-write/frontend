'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../../../constants/appRoutes';
import { DefaultProfileImage } from '@public/assets/icons';
import { UserResponse } from '@/types/user';
import { usePostSignout } from '@/hooks/api/users/usePostSignout';
import { UserDropdown } from '@/components/layout/GNB/UserDropdown';
import useBoolean from '@/hooks/useBoolean';

export const LoginSection = ({
  isSignIn,
  userInfo,
}: {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}) => {
  const router = useRouter();
  const {
    value: isDropdownOpen,
    toggle: toggleDropdown,
    setFalse: setIsDropdownClose,
  } = useBoolean();
  const { mutate: setSignOut } = usePostSignout();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignIn = () => {
    if (!isSignIn) {
      router.push(APP_ROUTES.signin);
    }
  };

  const handleLogout = () => {
    setIsDropdownClose();
    setSignOut();
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative hidden md:flex" ref={dropdownRef}>
      {userInfo ? (
        <button onClick={toggleDropdown}>
          {userInfo.image ? (
            <Image
              src={userInfo.image}
              alt="프로필 이미지"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <DefaultProfileImage
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </button>
      ) : (
        <button onClick={handleSignIn}>
          <span className="text-write-main text-base font-semibold">
            로그인
          </span>
        </button>
      )}

      {isDropdownOpen && (
        <UserDropdown onSignOut={handleLogout} onClose={setIsDropdownClose} />
      )}
    </div>
  );
};
