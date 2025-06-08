'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../../../constants/appRoutes';
import { DefaultProfileImage } from '@public/assets/icons';
import useBoolean from '@/hooks/useBoolean';
import { RefObject, useEffect, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePostSignout } from '@/hooks/api/users/usePostSignout';
import UserDropdown from '@/components/layout/GNB/UserDropdown';
import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
} from '@tanstack/react-query';
import { LoginSectionProps } from '@/components/layout/GNB/type';

export const LoginSection = ({ isSignIn, userInfo }: LoginSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: signOut } = usePostSignout();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    value: isDropdownOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBoolean();
  useClickOutside(containerRef as RefObject<HTMLElement>, closeDropdown);

  useEffect(() => {
    if (!containerRef.current) return;
  }, [closeDropdown]);

  const handleSignOut = () => {
    signOut();
    closeDropdown();
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div ref={containerRef} className="hidden md:flex">
        {userInfo && isSignIn ? (
          <button
            onClick={openDropdown}
            className="hidden items-center justify-center md:flex"
            aria-label="유저 메뉴 열기"
          >
            {userInfo.image ? (
              <Image
                className="h-14 w-14 rounded-full border border-gray-200 object-cover"
                src={userInfo.image}
                alt="프로필 이미지"
                width={40}
                height={40}
              />
            ) : (
              <DefaultProfileImage width={40} height={40} />
            )}
          </button>
        ) : (
          <button
            onClick={() => router.push(APP_ROUTES.signin)}
            className="hidden md:flex"
          >
            <span className="text-write-main text-base font-semibold">
              로그인
            </span>
          </button>
        )}
        {isDropdownOpen && (
          <UserDropdown onSignOut={handleSignOut} onClose={closeDropdown} />
        )}
      </div>
    </HydrationBoundary>
  );
};
