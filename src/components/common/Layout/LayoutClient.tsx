import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import GlobalStyle from '@styles/global';
import styled from '@emotion/styled';
import breakpoint from '@styles/breakpoint';

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
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: fit-content;
  padding: 0 180px;

  ${breakpoint.mobile} {
    padding: 0 20px;
  }
`;
