'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import color from '@styles/color';
import font from '@styles/font';
import { EODILogo } from '@/icons';

const MobileBlock = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) return null;

  return (
    <Overlay>
      <Container>
        <EODILogo />
        <Title>모바일 접속 불가</Title>
        <Description>
          해당 서비스는 PC 환경에서만 접속 가능합니다.
          <br />
          어디는 PC 환경에서 Chrome 브라우저로 접속하시는 것을 권장드립니다.
        </Description>
        <CloseButton onClick={() => window.close()}>페이지 닫기</CloseButton>
      </Container>
    </Overlay>
  );
};

export default MobileBlock;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${color.white};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 24px;
  text-align: center;
`;

const Title = styled.h1`
  ${font.H1}
  color: ${color.black};
  margin: 0;
`;

const Description = styled.p`
  ${font.p2}
  color: ${color.gray500};
  margin: 0;
  line-height: 1.6;
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
