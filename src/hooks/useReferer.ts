'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const useReferer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // referer + pageParams
  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const encodedReferer = encodeURIComponent(fullPath);
  const refererParam = `referer=${encodedReferer}`;

  const rawReferer = searchParams.get('referer');
  const redirectPath = rawReferer ? decodeURIComponent(rawReferer) : '/';

  return {
    refererParam,
    redirectPath,
  };
};

export default useReferer;
