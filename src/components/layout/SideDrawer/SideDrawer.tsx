'use client';

import LogoButton from '@/components/layout/GNB/LogoButton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import { usePostSignout } from '@/hooks/api/auth/usePostSignout';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import useReferer from '@/hooks/useReferer';
import { useSideDrawerStore } from '@/lib/store/useSideDrawerStore';
import { X } from 'lucide-react';

const MENU_ITEMS = [
  { label: APP_ROUTES_LABEL.mypage, href: APP_ROUTES.mypage },
  { label: APP_ROUTES_LABEL.social, href: APP_ROUTES.social },
  { label: APP_ROUTES_LABEL.library, href: APP_ROUTES.library },
];

const SideDrawer = () => {
  const { isSignIn, myInfo } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: signOut } = usePostSignout();
  const { refererParam } = useReferer();

  const { isDrawerOpen, closeDrawer } = useSideDrawerStore();
  if (!isDrawerOpen) return null;

  const handleSignIn = () => {
    router.push(`${APP_ROUTES.signin}?${refererParam}`);
    closeDrawer();
  };

  const handleSignOut = () => {
    signOut();
    closeDrawer();
    if (pathname === APP_ROUTES.mypage) {
      router.push(APP_ROUTES.signin);
    }
  };

  const isMenuActive = (item: { href: string }) => pathname === item.href;

  return (
    <>
      <div
        className="fixed inset-0 z-50 h-screen bg-black/50 md:hidden"
        onClick={() => closeDrawer()}
      />
      <div
        className={`fixed top-0 right-0 z-[60] flex h-full w-2/3 transform flex-col bg-white p-4 transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-20 flex justify-between">
          <LogoButton onClick={closeDrawer} />
          <button
            className="self-start text-xl text-gray-500"
            onClick={closeDrawer}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {MENU_ITEMS.filter((item) =>
          [APP_ROUTES.social, APP_ROUTES.library].includes(item.href)
        ).map((item) => (
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
        {isSignIn && myInfo ? (
          <Link
            href={APP_ROUTES.mypage}
            onClick={closeDrawer}
            className={`flex justify-between gap-3 rounded-md p-4 font-semibold text-gray-500 transition duration-300 ${
              pathname === APP_ROUTES.mypage
                ? 'bg-gray-200'
                : 'hover:bg-gray-200'
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
    </>
  );
};
export default SideDrawer;
