import { APP_ROUTES } from '@/constants/appRoutes';
import Link from 'next/link';

const LinkToSignIn = () => {
  return (
    <div className="flex-center gap-2">
      <span>이미 회원이신가요?</span>
      <Link
        href={APP_ROUTES.signin}
        className="text-write-main font-semibold underline"
      >
        로그인
      </Link>
    </div>
  );
};
export default LinkToSignIn;
