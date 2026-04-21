'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import { EODILogo } from '@/icons';
import { useRouter } from 'next/navigation';
import Text from '@components/common/Text/Text';
import { useEffect, useState } from 'react';
import useMobile from '@hooks/useMobile';

const MobileBlock = () => {
  const { isMobile, isInitialized } = useMobile();
  const router = useRouter();
  const [from, setFrom] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFrom(params.get('from'));
  }, []);

  useEffect(() => {
    if (isInitialized && !isMobile && from) router.replace(from);
  }, [isInitialized, isMobile, from, router]);

  return (
    <StyledMobileBlock>
      <EODILogo height={40} />
      <Text variant="H1">모바일 접속 불가</Text>
      <Text variant="p2" color={color.gray500}>
        해당 페이지는 PC 환경에서만 접속 가능합니다.
        <br />
      </Text>
      <CloseButton onClick={() => router.back()}>돌아가기</CloseButton>
    </StyledMobileBlock>
  );
};

export default MobileBlock;

const StyledMobileBlock = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${color.white};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 24px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: ${color.primary500};
  color: ${color.white};
  ${font.H4}
  cursor: pointer;

  &:active {
    background-color: ${color.primary400};
  }
`;
