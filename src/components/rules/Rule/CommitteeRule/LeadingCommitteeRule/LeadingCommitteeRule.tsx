import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

const LeadingCommitteeRule = () => {
  return (
    <StyledLeadingCommitteeRule>
      <Title>즉시 선도위원회 회부</Title>
      <Description>
        - 흡연 및 음주 관련 물품 소지
        <br />
        - 도박 행위
        <br />- 절도 행위
      </Description>
    </StyledLeadingCommitteeRule>
  );
};

export default LeadingCommitteeRule;

const StyledLeadingCommitteeRule = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  background-color: ${color.lightgreen};
`;
const Title = styled.p`
  ${font.H2}
  color: ${color.black};
`;

const Description = styled.p`
  ${font.p2}
  line-height: 1.8;
`;
