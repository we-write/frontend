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
import { useEffect, useRef } from 'react';

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
  const drawerRef = useRef<HTMLDivElement>(null);

  const { isDrawerOpen, closeDrawer } = useSideDrawerStore();

  useEffect(() => {
    if (isDrawerOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

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
        className={`fixed inset-0 z-50 h-screen bg-black/50 md:hidden ${!isDrawerOpen && 'hidden'}`}
        onClick={() => closeDrawer()}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-drawer-title"
        tabIndex={-1}
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 z-[60] flex h-full w-2/3 transform flex-col bg-white p-4 transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 id="side-drawer-title" className="sr-only">
          메뉴 사이드 드로어
        </h2>
        <div className="mb-20 flex justify-between">
          <LogoButton onClick={closeDrawer} />
          <button
            type="button"
            className="self-start text-xl text-gray-500"
            onClick={closeDrawer}
            aria-label="사이드 드로어 닫기"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="내비게이션 메뉴">
          <ul className="flex flex-col">
            {MENU_ITEMS.filter((item) =>
              [APP_ROUTES.social, APP_ROUTES.library].includes(item.href)
            ).map((item) => (
              <li
                key={item.href}
                className={`mb-2 rounded-md p-4 text-start font-semibold text-gray-500 ${
                  isMenuActive(item) ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => closeDrawer()}
                  className="block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isSignIn && myInfo ? (
              <li
                className={`mb-2 rounded-md p-4 text-start font-semibold text-gray-500 ${
                  pathname === APP_ROUTES.mypage
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-200'
                }`}
              >
                <Link
                  href={APP_ROUTES.mypage}
                  onClick={() => closeDrawer()}
                  className="block"
                >
                  마이페이지
                </Link>
              </li>
            ) : null}
            <hr className="my-4 border-t border-gray-200" />
            <li className="mb-2 rounded-md p-4 text-start font-semibold text-gray-500 hover:bg-gray-200">
              <button
                type="button"
                onClick={isSignIn ? handleSignOut : handleSignIn}
                className="w-full text-start"
              >
                {isSignIn ? '로그아웃' : '로그인'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default SideDrawer;
