'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useReferer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const encodedReferer = encodeURIComponent(pathname);
  const refererParam = `referer=${encodedReferer}`;

  const rawReferer = searchParams.get('referer');
  const redirectPath = rawReferer ? decodeURIComponent(rawReferer) : '/';

  return {
    router,
    pathname,
    encodedReferer,
    refererParam,
    redirectPath,
  };
};

export default useReferer;
