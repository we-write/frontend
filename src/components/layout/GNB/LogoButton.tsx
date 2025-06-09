import { LogoButtonProps } from '@/components/layout/SideDrawer/type';
import { APP_ROUTES } from '@/constants/appRoutes';
import Link from 'next/link';

const LogoButton = ({ onClick }: LogoButtonProps) => {
  return (
    <h1 className="text-write-main font-hanuman pt-1.5 text-lg font-black lg:text-2xl lg:font-bold">
      <Link href={APP_ROUTES.home} onClick={onClick}>
        WeWrite
      </Link>
    </h1>
  );
};
export default LogoButton;
