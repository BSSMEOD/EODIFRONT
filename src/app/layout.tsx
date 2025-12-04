'use client';
import LayoutClient from '@components/common/Layout/LayoutClient';
import { OverlayProvider } from '@toss/use-overlay';
import EmotionProvider from '@/provider/EmotionProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
        <EmotionProvider>
          <OverlayProvider>
            <LayoutClient>{children}</LayoutClient>
          </OverlayProvider>
        </EmotionProvider>
      </body>
    </html>
  );
};

export default Layout;
