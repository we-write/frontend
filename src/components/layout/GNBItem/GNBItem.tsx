import GNBItemProps from '@/components/layout/GNBItem/type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GNBItem({ label, href }: GNBItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={`${isActive ? 'text-write-main' : 'hover:text-write-main/60 text-gray-500'} transition duration-300`}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
}
