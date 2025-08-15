export const metadata = {
  title: 'EODI',
  description: 'Next + Emotion',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
};

export default Layout;
