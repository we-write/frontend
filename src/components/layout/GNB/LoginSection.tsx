'use client';
import Image from 'next/image';
import { DefaultProfileImage } from '@public/assets/icons';

import { RefObject, useEffect, useRef, useState } from 'react';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import UserDropdown from '@/components/layout/GNB/UserDropdown';
import useBoolean from '@/hooks/useBoolean';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePostSignout } from '@/hooks/api/users/usePostSignout';

export const LoginSection = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const { data: userInfo } = useGetMyInfo(isSignIn);
  const { value: isDropdownOpen, setTrue: openDropdown, setFalse: closeDropdown } = useBoolean();
  const { mutate: signout } = usePostSignout();

  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef as RefObject<HTMLElement>, closeDropdown);

  useEffect(() => {
    const localStorageData = localStorage.getItem('isSignIn') === 'true';
    setIsSignIn(localStorageData);
  }, [userInfo]);

  const handleSignIn = () => {
    if (isSignIn) {
      openDropdown();
    }
  };

  const handleSignOut = () => {
    signout();
    setIsSignIn(false);
    closeDropdown();
  };
  return (
    <div className="relative hidden md:flex" ref={containerRef}>
      <button onClick={handleSignIn}>
        {userInfo && isSignIn ? (
          userInfo.image ? (
            <Image
              className="h-14 w-14 rounded-full border border-gray-200 object-cover"
              src={userInfo.image}
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

      {isDropdownOpen && (
        <UserDropdown onSignOut={handleSignOut} onClose={closeDropdown} />
      )}
    </div>
  );
};
