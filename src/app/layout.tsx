import { ClientLayout } from '@components/common/ClientLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default Layout;
