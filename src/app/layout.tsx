import localFont from 'next/font/local';
import { Hanuman } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import QueryProviders from '@/providers/queryProviders';
import { GNB } from '@/components/layout/GNB/GNB';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import AuthProvider from '@/providers/auth-provider/AuthProvider';
import { ReactNode } from 'react';
import { ToastProvider } from '@/providers/ToastProvider';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={`flex min-h-screen flex-col ${pretendard.variable} ${hanuman.variable} antialiased`}
      >
        <ToastProvider>
          <QueryProviders>
            <AuthProvider>
              <header className="fixed z-50 h-15 w-full">
                <GNB />
              </header>

              <main>
                <LayoutWrapper>{children}</LayoutWrapper>
              </main>
            </AuthProvider>
          </QueryProviders>
        </ToastProvider>
      </body>
    </html>
  );
};

export default RootLayout;
