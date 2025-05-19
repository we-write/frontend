import localFont from 'next/font/local';
import { Hanuman } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import QueryProviders from '@/providers/queryProviders';
import GNB from '@/components/layout/GNB/GNB';

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
        className={`${pretendard.variable} ${hanuman.variable} antialiased`}
      >
        <QueryProviders>
          <GNB />
          <main className="mt-[60px] h-screen w-full bg-gray-100 p-4">
            {children}
          </main>
        </QueryProviders>
      </body>
    </html>
  );
}
