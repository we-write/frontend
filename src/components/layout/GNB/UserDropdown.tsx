'use client';

import { useRouter, usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { UserDropdownProps } from './type';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import Image from 'next/image';
import { DefaultProfileImage } from '@public/assets/icons';
import { usePostSignout } from '@/hooks/api/auth/usePostSignout';

const UserDropdown = ({
  isDropdownOpen,
  toggleDropDown,
  closeDropdown,
  profileImage,
}: UserDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: signOut } = usePostSignout();

  const handleSignOut = () => {
    signOut();

    closeDropdown();

    if (pathname === APP_ROUTES.mypage) {
      router.push(APP_ROUTES.signin);
    }
  };

  const gotoMyPage = () => {
    router.push(APP_ROUTES.mypage);

    closeDropdown();
  };

  return (
    <Dropdown
      isOpen={isDropdownOpen}
      onClose={closeDropdown}
      className="flex items-center"
      trigger={
        profileImage ? (
          <button
            className="h-10 w-10 overflow-hidden rounded-full bg-gray-300"
            onClick={toggleDropDown}
          >
            <Image
              src={profileImage}
              alt="프로필 이미지"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <DefaultProfileImage width={40} height={40} />
        )
      }
    >
      <Dropdown.Container className="absolute top-full right-0 z-10 w-40 rounded-xl bg-gray-50 shadow-lg">
        <Dropdown.Content
          onClick={() => gotoMyPage()}
          contentItem={
            <div className="block w-full rounded-xl px-4 py-4 text-left text-sm font-medium hover:bg-gray-100">
              마이페이지
            </div>
          }
        />
        <Dropdown.Content
          onClick={handleSignOut}
          contentItem={
            <div className="block w-full rounded-xl px-4 py-4 text-left text-sm font-medium hover:bg-gray-100">
              로그아웃
            </div>
          }
        />
      </Dropdown.Container>
    </Dropdown>
  );
};

export default UserDropdown;
