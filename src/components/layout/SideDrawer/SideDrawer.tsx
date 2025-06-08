'use client';

import { SideDrawerProps } from '@/components/layout/SideDrawer/type';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { usePostSignout } from '@/hooks/api/users/usePostSignout';
import { LogoButton } from '@/components/layout/GNB/LogoButton';

export const SideDrawer = ({
  isOpen,
  closeDrawer,
  isSignIn,
  userInfo,
  menuItems,
}: SideDrawerProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: signOut } = usePostSignout();

  const handleSignIn = () => {
    router.push(APP_ROUTES.signin);
    closeDrawer();
  };

  const handleSignOut = async () => {
    await signOut();
    closeDrawer();
    if (pathname === APP_ROUTES.mypage) {
      await router.push(APP_ROUTES.signin);
    }
  };

  const isMenuActive = (item: { href: string }) => pathname === item.href;

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-2/3 transform flex-col bg-white p-4 transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="mb-20 flex justify-between">
        <LogoButton onClick={closeDrawer} />
        <button
          className="self-start text-xl text-gray-500"
          onClick={closeDrawer}
        >
          ✕
        </button>
      </div>
      {menuItems
        .filter((item) =>
          [APP_ROUTES.social, APP_ROUTES.library].includes(item.href)
        )
        .map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeDrawer}
            className={`mb-2 rounded-md p-4 text-start font-semibold text-gray-500 transition duration-300 ${
              isMenuActive(item) ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            {item.label}
          </Link>
        ))}
      {isSignIn && userInfo ? (
        <Link
          href={APP_ROUTES.mypage}
          onClick={closeDrawer}
          className={`flex justify-between gap-3 rounded-md p-4 font-semibold text-gray-500 transition duration-300 ${
            pathname === APP_ROUTES.mypage ? 'bg-gray-200' : 'hover:bg-gray-200'
          }`}
        >
          마이페이지
        </Link>
      ) : null}
      <hr className="my-4 border-t border-gray-200" />
      <button
        type="button"
        className="w-full rounded-md p-4 text-start text-base font-semibold text-gray-500 transition duration-300 hover:bg-gray-200"
        onClick={isSignIn ? handleSignOut : handleSignIn}
      >
        {isSignIn ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
};
