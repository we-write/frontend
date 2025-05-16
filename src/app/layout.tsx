import localFont from 'next/font/local';
import { Hanuman } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import QueryProviders from '@/providers/queryProviders';

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
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
