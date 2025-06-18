'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const layoutStyle = useMemo(() => {
    if (pathname.startsWith('/auths')) {
      return {
        outer: 'bg-gray-100',
        inner: 'w-full',
      };
    }

    if (
      pathname === '/library' ||
      pathname.startsWith('/social') ||
      pathname.startsWith('/mypage')
    ) {
      return {
        outer: 'bg-gray-100',
        inner:
          'bg-gray-50 mx-auto w-full max-w-300 px-4 pt-20 min-h-lvh h-full',
      };
    }

    // default layout
    return {
      outer: 'bg-white',
      inner: 'w-full',
    };
  }, [pathname]);

  return (
    <div className={`h-full flex-1 ${layoutStyle.outer}`}>
      <div className={layoutStyle.inner}>{children}</div>
    </div>
  );
};

export default LayoutWrapper;
