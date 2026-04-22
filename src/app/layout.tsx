'use client';
import { Analytics } from '@vercel/analytics/next';
import LayoutClient from '@components/common/Layout/LayoutClient';
import { OverlayProvider } from '@toss/use-overlay';
import EmotionProvider from '@/provider/EmotionProvider';
import TanstackQueryProvider from '@/provider/QueryClientProvider';
import ToastProvider from '@/provider/ToastProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>어디</title>
      </head>
      <body>
        <TanstackQueryProvider>
          <EmotionProvider>
            <OverlayProvider>
              <ToastProvider>
                <LayoutClient>{children}</LayoutClient>
              </ToastProvider>
            </OverlayProvider>
          </EmotionProvider>
        </TanstackQueryProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
