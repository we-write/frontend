'use client';

import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, BookOpen } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import useBoolean from '@/hooks/useBoolean';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import useReferer from '@/hooks/useReferer';
import UserProfileDropdown from './UserProfileDropdown';
import { Hamburger } from '@public/assets/icons';
import { useSideDrawerStore } from '@/lib/store/useSideDrawerStore';

const MenuGroups = () => {
  const pathname = usePathname();
  const { refererParam } = useReferer();
  const { isSignIn, myInfo } = useAuth();
  const { openDrawer } = useSideDrawerStore();

  const {
    value: isDropdownOpen,
    toggle: toggleDropDown,
    setFalse: closeDropdown,
  } = useBoolean();

  const ref = useClickOutside<HTMLLIElement>(closeDropdown);

  return (
    <>
      <ul className="hidden gap-6 font-semibold md:flex md:w-full md:items-center">
        <li
          className={`${
            pathname === '/social'
              ? 'text-write-main bg-gray-100'
              : 'text-gray-500'
          } hover:text-write-main inline-flex rounded-xl px-3 py-1.5 hover:bg-gray-100`}
        >
          <Link
            href={APP_ROUTES.social}
            className="inline-flex items-center gap-1.5"
          >
            <Users className="h-5 w-5" aria-hidden="true" />
            {APP_ROUTES_LABEL.social}
          </Link>
        </li>

        <li
          className={`${
            pathname === '/library'
              ? 'text-write-main bg-gray-100'
              : 'text-gray-500'
          } hover:text-write-main inline-flex rounded-xl px-2 py-1.5 hover:bg-gray-100`}
        >
          <Link
            href={APP_ROUTES.library}
            className="inline-flex items-center gap-1.5"
          >
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            {APP_ROUTES_LABEL.library}
          </Link>
        </li>

        <li ref={ref} className="relative ml-auto hidden md:flex">
          {myInfo && isSignIn ? (
            <UserProfileDropdown
              isDropdownOpen={isDropdownOpen}
              toggleDropDown={toggleDropDown}
              closeDropdown={closeDropdown}
              profileImage={myInfo.image ?? null}
            />
          ) : (
            <Link
              href={`${APP_ROUTES.signin}?${refererParam}`}
              className="text-write-main text-base font-semibold"
            >
              로그인
            </Link>
          )}
        </li>
      </ul>
      <button
        className="absolute top-5 right-5 md:hidden"
        onClick={() => openDrawer()}
      >
        <Hamburger
          className="h-6 w-6 text-gray-500"
          fill="currentColor"
          aria-hidden="true"
        />
      </button>
    </>
  );
};

export default MenuGroups;
