'use client';
import LayoutClient from '@components/common/Layout/LayoutClient';
import { OverlayProvider } from '@toss/use-overlay';
import EmotionProvider from '@/provider/EmotionProvider';
import TanstackQueryProvider from '@/provider/QueryClientProvider';
import ToastProvider from '@/provider/ToastProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
        <title>어디</title>
        <TanstackQueryProvider>
          <EmotionProvider>
            <OverlayProvider>
              <ToastProvider>
                <LayoutClient>{children}</LayoutClient>
              </ToastProvider>
            </OverlayProvider>
          </EmotionProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
};

export default Layout;
