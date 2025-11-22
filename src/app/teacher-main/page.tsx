'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

const TeacherMainPage = () => {
  return (
    <StyledTeacherMainPage>
      <StyledDashboard>
        <PointsSection>상정요청 대기</PointsSection>
      </StyledDashboard>
    </StyledTeacherMainPage>
  );
};

export default TeacherMainPage;
const StyledTeacherMainPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
`;
const PointsSection = styled.div`
  width: 100%;
  background-color: ${color.primary};
  font: ${font.H1};
`;
