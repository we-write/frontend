import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 메뉴 항목
const MENU_ITEMS = [
  { label: APP_ROUTES_LABEL.social, href: APP_ROUTES.social },
  { label: APP_ROUTES_LABEL.library, href: APP_ROUTES.library },
];

export const MenuGroups = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden gap-6 font-semibold md:flex">
      {MENU_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <li
            key={href}
            className={`${
              isActive ? 'text-write-main bg-gray-100' : 'text-gray-500'
            } hover:text-write-main rounded-xl px-2 py-1.5 hover:bg-gray-100`}
          >
            <Link href={href}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
