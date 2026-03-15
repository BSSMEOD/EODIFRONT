import color from '@styles/color';
import styled from '@emotion/styled';
import font from '@styles/font';

interface StandardApplyingPointProps {
  id?: string;
}

const StandardApplyingPoint = ({ id }: StandardApplyingPointProps) => {
  return (
    <StyledStandardApplyingPoint id={id}>
      <Title>상벌점제 적용 기준</Title>
      <Description>
        <Bold>상점 1점</Bold>은 <Bold>벌점 1점</Bold>을 상쇄 가능하다.
      </Description>
      <TextBox>
        <Description>
          벌점은 누적 점수에 따라 아래와 같이 지도한다.
          <br />
          - 벌점 누적 5점 이상 : 담임교사 생활 지도 (훈계, 반성문 작성 등)
          <br />
          - 벌점 누적 10점 이상 : 학년 대표 교사, 학생자치부 생활 지도
          <br />- 벌점 누적 15점 이상 : 생활교육위원회<Asterisk>*</Asterisk>
          진행
        </Description>
        <Description>
          <Asterisk>*</Asterisk>생활교육위원회에서는 다음을 결정한다. <br />
          학년 부 자체 해결
          <br />
          선도위원회 개최
          <br />
          기숙사운영위원회 개최
        </Description>
      </TextBox>
      <Description>
        기준 이외의 행위에 대해서는 생활교육위원회 회의를 통해 상벌점을 부과할
        수 있다.
        <br /> 매 학년도 상벌점제 누가기록을 마이스터고 역량 인증제에 반영한다.
        <br /> 매 학년도 3월에 전 학년도의 상벌점 누계는 0점으로 처리한다.
      </Description>
    </StyledStandardApplyingPoint>
  );
};

export default StandardApplyingPoint;

const StyledStandardApplyingPoint = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  border-radius: 20px;
  gap: 20px;
  background-color: ${color.primary100};
`;

const Title = styled.p`
  ${font.H2}
`;

const Description = styled.p`
  ${font.p2}
  line-height: 1.8;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

const Asterisk = styled.span`
  ${font.p2};
  color: ${color.red};
`;

const Bold = styled.span`
  font-weight: 700;
`;
