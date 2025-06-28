import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '공개된 스토리 - WeWrite',
  description: '사람들이 만들어 나가는 다채로운 이야기를 탐색할 수 있습니다.',
};

const LibraryLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default LibraryLayout;
