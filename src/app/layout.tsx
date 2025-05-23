import localFont from 'next/font/local';
import { Hanuman } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import QueryProviders from '@/providers/queryProviders';
import { GNB } from '@/components/layout/GNB/GNB';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--pretendard',
});

const hanuman = Hanuman({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hanuman',
});

export const metadata: Metadata = {
  title: 'We Write',
  description: 'We Write',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`flex min-h-screen flex-col ${pretendard.variable} ${hanuman.variable} antialiased`}
      >
        <QueryProviders>
          <header>
            <GNB />
          </header>
          <main className="flex-1 bg-gray-100">
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
        </QueryProviders>
      </body>
    </html>
  );
}
