'use client';

import { LoginSection } from './LoginSection';
import { SideDrawer } from '../SideDrawer/SideDrawer';
import { LogoButton } from '@/components/layout/GNB/LogoButton';
import { MenuGroups } from '@/components/layout/GNB/MenuGroups';
import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import useBoolean from '@/hooks/useBoolean';
import { Hamburger } from '@public/assets/icons';
import { useAuth } from '@/utils/authContext';

// 메뉴 항목
const MENU_ITEMS = [
  { label: APP_ROUTES_LABEL.social, href: APP_ROUTES.social },
  { label: APP_ROUTES_LABEL.library, href: APP_ROUTES.library },
];

// 이미지 경로
const SIGN_IN_IMAGE = '/assets/images/Profile.png';

export const GNB = () => {
  const { isSignIn, userInfo } = useAuth();
  const {
    value: isDrawerOpen,
    setTrue: setIsDrawerOpen,
    setFalse: setIsDrawerClose,
  } = useBoolean();

  return (
    <>
      <nav className="fixed top-0 z-50 h-15 w-full bg-white">
        <div className="flex-center mx-auto h-full w-full max-w-300 px-4 md:justify-between md:pr-6 md:pl-7 lg:px-1">
          {/* Logo */}
          <div className="flex items-center gap-5 truncate lg:gap-10">
            <LogoButton />
            {/* 데스크탑 메뉴 */}
            <MenuGroups />
          </div>
          {/* 데스크탑 로그인 영역*/}
          <LoginSection isSignIn={isSignIn} userInfo={userInfo} />
          {/* 모바일 햄버거 */}
          <button
            className="absolute top-5 right-5 md:hidden"
            onClick={() => setIsDrawerOpen()}
          >
            <Hamburger
              className="h-6 w-6 text-gray-500"
              fill="currentColor"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
      {/* 오버레이 */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 h-screen bg-black/50 md:hidden"
          onClick={() => setIsDrawerClose()}
        />
      )}
      {/* 시아드 드로어 (모바일 화면에 표시) */}
      <SideDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerClose()}
        isSignIn={isSignIn}
        menuItems={MENU_ITEMS}
        signInImageSrc={SIGN_IN_IMAGE}
      />
    </>
  );
};
