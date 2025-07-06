import { LogoButtonProps } from '@/components/layout/SideDrawer/type';
import { APP_ROUTES } from '@/constants/appRoutes';
import Link from 'next/link';

const LogoButton = ({ onClick }: LogoButtonProps) => {
  return (
    <Link
      href={APP_ROUTES.home}
      onClick={onClick}
      className="mx-auto flex items-center"
    >
      <div className="text-write-main font-hanuman pt-1.5 text-lg font-black lg:text-2xl lg:font-bold">
        WeWrite
      </div>
    </Link>
  );
};
export default LogoButton;
