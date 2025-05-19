'use client';

import HamburgerIcon from '@/components/icons/HamburgerIcon';
import Link from 'next/link';
import { useState } from 'react';
import { GNBItem } from '../GNBItem/GNBItem';
import { LoginSection } from '../LoginSection/LoginSection';
import { SideDrawer } from '../SideDrawer/SideDrawer';

// 메뉴 항목
const MENU_ITEMS = [
  { label: '모임찾기', href: '/social' },
  { label: '스토리 찾기', href: '/library' },
];

// 이미지 경로
const IMAGES = {
  signIn: '/assets/images/signin.png',
  hamburger: '/assets/icons/Hamburger.svg',
};

export const GNB = () => {
  const [isSignIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 h-[60px] w-full bg-white">
      <div className="flex-center mx-auto h-full w-full max-w-[1200px] px-4 md:justify-between md:pr-[24px] md:pl-[28px] lg:px-[4px]">
        {/* Logo */}
        <div className="flex items-center gap-[20px] truncate lg:gap-[40px]">
          <h1 className="text-write-main font-hanuman pt-[2px] text-lg font-[900] lg:text-2xl lg:font-[700]">
            <Link href="/social">WeWrite</Link>
          </h1>
          {/* 데스크탑 메뉴 */}
          <ul className="hidden gap-[24px] font-[600] md:flex">
            {MENU_ITEMS.map((item) => (
              <GNBItem key={item.href} {...item} />
            ))}
          </ul>
        </div>
        {/* 데스크탑 로그인 영역*/}
        <div className="hidden md:flex">
          <LoginSection isSignIn={isSignIn} />
        </div>
        {/* 모바일 햄버거 */}
        <button
          className="absolute top-[18px] right-[20px] md:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          <HamburgerIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      {/* 오버레이 */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      {/* 시아드 드로어 (모바일 화면에 표시) */}
      <SideDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
        isSignIn={isSignIn}
        menuItems={MENU_ITEMS}
        signInImageSrc={IMAGES.signIn}
      />
    </nav>
  );
};
