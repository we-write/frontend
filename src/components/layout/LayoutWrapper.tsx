// src/components/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuths = pathname.startsWith('/auths');
  const basicStyle = 'mx-auto w-full max-w-300 px-4 pt-20 min-h-lvh';
  return (
    <div className={`${basicStyle} ${isAuths ? null : 'bg-gray-50'}`}>
      {children}
    </div>
  );
}
