import color from '@styles/color';
import styled from '@emotion/styled';
import font from '@styles/font';

const MainRule = () => {
  return (
    <StyledMainRule>
      <Title>분실물 관리 서비스, 어디 를 찾아주셔서 감사합니다.</Title>
      <p css={font.H2}>사용 방법은?</p>
      <p css={font.p2}>
        1. 검색을 통해 분실물이 접수되었나 확인
        <br />
        2. 자신의 분실물을 찾았다면, 소유권 주장 진행
        <br />
        확인 후 학생회나 학생자치부 선생님을 통해 지급
      </p>
      <p css={font.H2}>분실물 발견 시에는?</p>
      <p css={font.p2}>
        2학년 2반 이하은 (@han22._x), 학생자치부 진예빈, 유근찬 선생님을 통해
        분실물 접수
        <br />→ 상점 지급
      </p>
      <p css={font.H2}>찾아가야 하는 기한은?</p>
      <p css={font.p2}>
        한 학기가 끝날 때마다 전체 분실물 폐기 → 분실 시 학기가 지나기 전
        찾아가야 함<br />
        학기가 지나고 폐기된 분실물을 다시 찾기는 불가
      </p>
    </StyledMainRule>
  );
};

export default MainRule;

const StyledMainRule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  border-radius: 20px;
  gap: 16px;
  background-color: ${color.lightblue};
`;

const Title = styled.p`
  ${font.H1}
  margin: 0;
`;

