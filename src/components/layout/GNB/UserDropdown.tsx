'use client';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { UserDropdownProps } from './type';

export const UserDropdown = ({ onSignOut, onClose }: UserDropdownProps) => {
  const router = useRouter();
  const handleSignOut = () => {
    onSignOut();
    onClose();
    router.push(APP_ROUTES.home);
  };
  const handleMyPage = () => {
    onClose();
    router.push(APP_ROUTES.mypage);
  };

  return (
    <div className="absolute top-10 right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl bg-gray-50 shadow-lg">
      <button
        onClick={() => handleMyPage()}
        className="block w-full px-4 py-4 text-left text-sm hover:bg-gray-100"
      >
        마이페이지
      </button>
      <button
        onClick={handleSignOut}
        className="block w-full px-4 py-4 text-left text-sm hover:bg-gray-100"
      >
        로그아웃
      </button>
    </div>
  );
};
