'use client';

import { SideDrawerProps } from '@/components/layout/SideDrawer/type';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { usePostSignout } from '@/hooks/api/users/usePostSignout';
import { DefaultProfileImage } from '@public/assets/icons';

export const SideDrawer = ({
  isOpen,
  userInfo,
  closeDrawer,
  menuItems,
}: SideDrawerProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: setSignOut } = usePostSignout();

  const handleSignIn = () => {
    closeDrawer();
    router.push(APP_ROUTES.signin);
  };

  const handleSignout = () => {
    setSignOut(); // 쿠키 삭제 및 세션 무효화
    closeDrawer();
    router.refresh(); // SSR 데이터(userInfo) 반영
  };

  const isMenuActive = (item: { href: string }) => pathname === item.href;

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-2/3 transform flex-col gap-4 bg-white p-6 transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        className="mb-4 self-end rounded-md px-6 py-4 text-base font-semibold text-gray-500"
        onClick={closeDrawer}
      >
        ✕
      </button>

      {userInfo && (
        <Link
          href={APP_ROUTES.mypage}
          className="flex-center mb-4"
          onClick={closeDrawer}
        >
          {userInfo.image ? (
            <Image
              src={userInfo.image}
              alt="프로필 이미지"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <DefaultProfileImage
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </Link>
      )}

      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={closeDrawer}
          className={`rounded-md p-4 text-start font-semibold text-gray-500 transition duration-300 ${
            isMenuActive(item) ? 'bg-gray-200' : 'hover:bg-gray-200'
          }`}
        >
          {item.label}
        </Link>
      ))}

      <button
        onClick={userInfo ? handleSignout : handleSignIn}
        type="button"
        className="w-full rounded-md p-4 text-start text-base font-semibold text-gray-500 transition duration-300 hover:bg-gray-200"
      >
        {userInfo ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
};
