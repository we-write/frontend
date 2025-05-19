import { SideDrawerProps } from '@/components/layout/SideDrawer/type';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideDrawer({
  isOpen,
  closeDrawer,
  isSignIn,
  menuItems,
  signInImageSrc,
}: SideDrawerProps) {
  const pathname = usePathname();
  const handleSignIn = () => {
    if (isSignIn) {
      window.location.href = '/auths/signout';
    } else {
      window.location.href = '/auths/signin';
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-[240px] transform flex-col gap-4 bg-white p-6 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
    >
      <button
        className="mb-4 cursor-pointer self-end text-sm font-[600] text-gray-500"
        onClick={closeDrawer}
      >
        ✕ 닫기
      </button>

      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeDrawer}
            className={`rounded-md p-4 text-center font-[600] transition duration-300 ${isActive ? 'text-write-main bg-gray-300' : 'text-gray-500 hover:bg-gray-200'} `}
          >
            {item.label}
          </Link>
        );
      })}

      <div onClick={handleSignIn}>
        {isSignIn ? (
          <span className="flex-center cursor-pointer">
            <Image
              src={signInImageSrc}
              alt="SignInImg"
              width={40}
              height={40}
            />
          </span>
        ) : (
          <button className="text-write-main h-full w-full cursor-pointer rounded-md p-4 text-base font-[600] transition duration-300 hover:bg-gray-200">
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
