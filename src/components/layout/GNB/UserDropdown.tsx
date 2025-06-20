'use client';
import { useRouter, usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { UserDropdownProps } from './type';

const UserDropdown = ({ onSignOut, onClose }: UserDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleSignOut = async () => {
    await onSignOut();
    onClose();
    if (pathname === APP_ROUTES.mypage) {
      await router.push(APP_ROUTES.signin);
    }
  };
  const gotoMyPage = () => {
    router.push(APP_ROUTES.mypage);
    onClose();
  };

  return (
    <div className="mt-2.5 w-40 overflow-hidden rounded-xl bg-gray-50 shadow-lg">
      <button
        onClick={() => gotoMyPage()}
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

export default UserDropdown;
