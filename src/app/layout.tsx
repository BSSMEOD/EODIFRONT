'use client';
import LayoutClient from '@components/common/Layout/LayoutClient';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
};

export default Layout;
