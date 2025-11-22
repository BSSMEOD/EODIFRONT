'use client';
import LayoutClient from '@components/common/Layout/LayoutClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
};

export default Layout;
