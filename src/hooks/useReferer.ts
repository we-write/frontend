'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const useReferer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const encodedReferer = encodeURIComponent(pathname);
  const refererParam = `referer=${encodedReferer}`;

  const rawReferer = searchParams.get('referer');
  const redirectPath = rawReferer ? decodeURIComponent(rawReferer) : '/';

  return {
    pathname,
    encodedReferer,
    refererParam,
    redirectPath,
  };
};

export default useReferer;
