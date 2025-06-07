'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isAuths = pathname.startsWith('/auths');
  const basicStyle = 'mx-auto w-full max-w-300 px-4 pt-20 min-h-lvh h-full';
  return (
    <div className="h-full flex-1 bg-gray-100">
      <div className={`${basicStyle} ${isAuths ? null : 'bg-gray-50'}`}>
        {children}
      </div>
    </div>
  );
};
export default LayoutWrapper;
