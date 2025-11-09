/** @jsxImportSource @emotion/react */
'use client';
import Header from '@components/common/Header/Header';
import Footer from '@components/common/Footer/Footer';
import GlobalStyle from '@styles/global';
import styled from '@emotion/styled';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient = ({ children }: LayoutClientProps) => {
  return (
    <>
      <GlobalStyle />
      <Body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Body>
    </>
  );
};

export default LayoutClient;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
`;
