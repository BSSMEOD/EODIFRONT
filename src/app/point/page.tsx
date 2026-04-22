'use client';

import styled from '@emotion/styled';
import PointTable from '@components/point/PointTable/PointTable';
import font from '@styles/font';
import color from '@styles/color';
import { useRequireRole } from '@hooks/useRequireRole';
import { useMobileBlock } from '@hooks/useMobileBlock';

const PointPage = () => {
  useRequireRole('TEACHER');
  useMobileBlock();

  return (
    <StyledPointPage>
      <Title>상점 처리하기</Title>
      <PointTable />
    </StyledPointPage>
  );
};

export default PointPage;

const StyledPointPage = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  ${font.H1}
  color: ${color.black};
  margin-bottom: 24px;
`;
