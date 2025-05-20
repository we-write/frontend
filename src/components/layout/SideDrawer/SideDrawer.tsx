"use client";

import { SideDrawerProps } from '@/components/layout/SideDrawer/type';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useSignIn } from '@/hooks/useSignIn';

export const SideDrawer = ({
  isOpen,
  closeDrawer,
  menuItems,
  signInImageSrc,
}: SideDrawerProps) => {
  const pathname = usePathname();
  const { isSignIn, toggleSignIn } = useSignIn();

  const handleSignIn = () => {
    toggleSignIn();
    closeDrawer();
  };

  const isMenuActive = (item: { href: string }) => {
    return pathname === item.href;
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-2/3 transform flex-col gap-4 bg-white p-6 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <button
        className="mb-4 self-end px-6 py-4 text-base font-semibold text-gray-500 rounded-md"
        onClick={closeDrawer}
      >
        ✕
      </button>

      {isSignIn && (
        <Link
          href={APP_ROUTES.mypage}
          role="button"
          className="flex-center mb-4"
        >
          <Image src={signInImageSrc} alt="SignInImg" width={40} height={40} />
        </Link>
      )}

      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={closeDrawer}
          className={`rounded-md p-4 text-start font-semibold text-gray-500 transition duration-300 ${isMenuActive(item) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
        >
          {item.label}
        </Link>
      ))}

      <Link href={APP_ROUTES.signin}>
        <button
          onClick={handleSignIn}
          type="button"
          className="w-full rounded-md p-4 text-start text-base font-semibold text-gray-500 transition duration-300 hover:bg-gray-200"
        >
          {isSignIn ? '로그아웃' : '로그인'}
        </button>
      </Link>
    </div>
  );
};
