import localFont from 'next/font/local';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import QueryProviders from '@/providers/queryProviders';

const myFont = localFont({
  src: '../fonts/PretendardVariable.woff2',
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
      <body className={`${myFont.className} antialiased`}>
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
