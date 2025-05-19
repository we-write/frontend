import GNBItemProps from '@/components/layout/GNBItem/type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const GNBItem = ({ label, href }: GNBItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={`${isActive ? 'text-write-main bg-gray-100' : ''} hover:text-write-main hover:bg-gray-100 text-gray-500  py-1.5 px-2 rounded-xl `}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};
