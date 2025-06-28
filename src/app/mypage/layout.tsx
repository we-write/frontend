import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '마이 페이지 - WeWrite',
  description:
    '내 프로필을 수정하거나, 참가한 모임, 좋아요 한 모임을 확인할 수 있습니다.',
  robots: { index: false, follow: false },
};

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MyPageLayout;
