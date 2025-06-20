import { APP_ROUTES, APP_ROUTES_LABEL } from '@/constants/appRoutes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, BookOpen } from 'lucide-react';

const MenuGroups = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden gap-6 font-semibold md:flex">
      <li
        className={`${
          pathname === '/social'
            ? 'text-write-main bg-gray-100'
            : 'text-gray-500'
        } hover:text-write-main inline-flex rounded-xl px-3 py-1.5 hover:bg-gray-100`}
      >
        <Link
          href={APP_ROUTES.social}
          className="inline-flex items-center gap-1.5"
        >
          <Users className="h-5 w-5" aria-hidden="true" />
          {APP_ROUTES_LABEL.social}
        </Link>
      </li>
      <li
        className={`${
          pathname === '/library'
            ? 'text-write-main bg-gray-100'
            : 'text-gray-500'
        } hover:text-write-main inline-flex rounded-xl px-2 py-1.5 hover:bg-gray-100`}
      >
        <Link
          href={APP_ROUTES.library}
          className="inline-flex items-center gap-1.5"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          {APP_ROUTES_LABEL.library}
        </Link>
      </li>
    </ul>
  );
};

export default MenuGroups;
