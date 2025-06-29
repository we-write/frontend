'use client';

import SideDrawer from '../SideDrawer/SideDrawer';
import LogoButton from '@/components/layout/GNB/LogoButton';
import MenuGroups from '@/components/layout/GNB/MenuGroups';
import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import useBoolean from '@/hooks/useBoolean';
import { Hamburger } from '@public/assets/icons';

// 메뉴 항목
const MENU_ITEMS = [
  { label: APP_ROUTES_LABEL.mypage, href: APP_ROUTES.mypage },
  { label: APP_ROUTES_LABEL.social, href: APP_ROUTES.social },
  { label: APP_ROUTES_LABEL.library, href: APP_ROUTES.library },
];

export const GNB = () => {
  const {
    value: isDrawerOpen,
    setTrue: setIsDrawerOpen,
    setFalse: setIsDrawerClose,
  } = useBoolean();

  return (
    <>
      <nav className="flex-center h-full w-full border-b border-gray-200 bg-white">
        <div className="flex w-full max-w-300 gap-6 px-4 md:pr-6 md:pl-7 lg:gap-10 xl:px-1">
          <LogoButton />
          <MenuGroups />
          {/* <LoginSection /> */}
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
        menuItems={MENU_ITEMS}
      />
    </>
  );
};
