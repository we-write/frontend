'use client';

import { useRouter, usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { UserProfileDropdownProps } from '@/components/layout/GNB/type';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import Image from 'next/image';
import { DefaultProfileImage } from '@public/assets/icons';
import { usePostSignout } from '@/hooks/api/auth/usePostSignout';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const UserProfileDropdown = ({
  isDropdownOpen,
  toggleDropDown,
  closeDropdown,
  userName,
  profileImage,
}: UserProfileDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItemRef = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { mutate: signOut } = usePostSignout();

  useEffect(() => {
    if (isDropdownOpen) {
      setFocusedIndex(0);
      setTimeout(() => {
        menuItemRef.current[0]?.focus();
      }, 0);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        closeDropdown();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  const handleSignOut = () => {
    signOut();

    closeDropdown();

    if (pathname === APP_ROUTES.mypage) {
      router.push(APP_ROUTES.signin);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!isDropdownOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (focusedIndex + 1) % menuItemRef.current.length;
      setFocusedIndex(nextIndex);
      menuItemRef.current[nextIndex]?.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex =
        (focusedIndex - 1 + menuItemRef.current.length) %
        menuItemRef.current.length;
      setFocusedIndex(prevIndex);
      menuItemRef.current[prevIndex]?.focus();
    }

    if (e.key === 'Escape') {
      closeDropdown();
    }
  };

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onClose={closeDropdown}
      className="flex items-center"
      trigger={
        <button
          type="button"
          aria-label={`${profileImage && userName ? `${userName}님의 프로필 이미지.` : '기본 프로필 이미지.'}클릭하면 사용자 메뉴가 열립니다`}
          aria-expanded={isDropdownOpen}
          aria-controls="profile-dropdown"
          aria-haspopup="menu"
          onClick={toggleDropDown}
        >
          {profileImage && userName ? (
            <Image
              src={profileImage}
              alt=""
              width={48}
              height={48}
              className="aspect-square h-12 w-12 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <DefaultProfileImage width={48} height={48} aria-hidden="true" />
          )}
        </button>
      }
    >
      <Dropdown.Container
        id="profile-dropdown"
        role="menu"
        onKeyDown={handleMenuKeyDown}
        className="absolute top-full right-0 z-10 w-40 rounded-xl bg-gray-50 shadow-lg"
      >
        <Dropdown.Content
          contentItem={
            <Link
              ref={(el) => {
                menuItemRef.current[0] = el;
              }}
              href={`${APP_ROUTES.mypage}`}
              tabIndex={0}
              role="menuitem"
              onClick={() => closeDropdown()}
              className="block w-full rounded-xl px-4 py-4 text-left text-sm font-medium hover:bg-gray-100"
            >
              마이페이지
            </Link>
          }
        />
        <Dropdown.Content
          onClick={handleSignOut}
          contentItem={
            <div
              ref={(el) => {
                menuItemRef.current[1] = el;
              }}
              role="menuitem"
              tabIndex={0}
              className="block w-full rounded-xl px-4 py-4 text-left text-sm font-medium hover:bg-gray-100"
            >
              로그아웃
            </div>
          }
        />
      </Dropdown.Container>
    </Dropdown>
  );
};

export default UserProfileDropdown;
