import { APP_ROUTES } from '@/constants/appRoutes';
import Link from 'next/link';

export const LogoButton = () => {
  return (
    <h1 className="text-write-main font-hanuman pt-1.5 text-lg font-black lg:text-2xl lg:font-bold">
      <Link href={APP_ROUTES.home}>WeWrite</Link>
    </h1>
  );
};
