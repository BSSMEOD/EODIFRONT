'use client';
import Header from '@components/common/Header/Header';
import Footer from '@components/common/Footer/Footer';
import GlobalStyle from '@styles/global';
import styled from '@emotion/styled';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <Body suppressHydrationWarning>
        <GlobalStyle />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Body>
    </html>
  );
};

export default Layout;

const Body = styled.body`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;
