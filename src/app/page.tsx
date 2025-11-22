'use client';
import styled from '@emotion/styled';
import MainRule from '@components/main/MainRule/MainRule';
import font from '@styles/font';
import { Button } from '@ui/Button/Button';
import { useRouter } from 'next/navigation';
import LostItemVergeDiscard from '@components/main/LostItemVergeDiscard/LostItemVergeDiscard';

const MainPage = () => {
  const router = useRouter();

  return (
    <StyledMainPage>
      <SortMainRules>
        <MainRuleNav>
          <p css={font.D1}>
            분실물 관리 서비스,
            <br />
            어디
          </p>
          <Button styleType={'SECONDARY'} onClick={() => router.push('/rules')}>
            <p css={font.H3}>상벌점제 규정 확인하기</p>
          </Button>
        </MainRuleNav>
        <MainRule />
      </SortMainRules>
      <LostItemVergeDiscard />
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MainRuleNav = styled.div`
  width: 25%;
  gap: 100px;
  display: flex;
  flex-direction: column;
`;

const SortMainRules = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
`;
