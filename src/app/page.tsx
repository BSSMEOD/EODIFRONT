'use client';

import styled from '@emotion/styled';
import MainRule from '@components/main/MainRule/MainRule';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button/Button';
import { useRouter } from 'next/navigation';
import LostItemVergeDiscard from '@components/main/LostItemVergeDiscard/LostItemVergeDiscard';
import color from '@styles/color';
import Flex from '@ui/Flex/Flex';
import { ROUTES } from '@/constants/common/constants';

const MainPage = () => {
  const router = useRouter();

  return (
    <StyledMainPage>
      <Flex gap={24} width="100%">
        <Flex direction="column" gap={100} width="30%">
          <Text variant="D1">
            분실물 관리 서비스,
            <br />
            어디
          </Text>
          <Button
            styleType={'SECONDARY'}
            onClick={() => router.push(ROUTES.RULES)}
          >
            <Text variant="H4" color={color.white}>
              상벌점제 규정 확인하기
            </Text>
          </Button>
        </Flex>
        <MainRule />
      </Flex>
      <LostItemVergeDiscard />
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  margin: 0 auto;
  padding-top: 66px;
`;
