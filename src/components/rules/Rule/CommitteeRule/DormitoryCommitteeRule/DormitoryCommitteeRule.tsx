import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

const DormitoryCommitteeRule = () => {
  return (
    <StyledDormitoryCommitteeRule>
      <Title>즉시 기숙사위원회 회부</Title>
      <Description>
        - 타 호실 취침 2회 이상
        <br />
        - 미입소자 대리 입소 신고(본인과 대리신고자)
        <br />- 무단 외출 및 무단 외박
      </Description>
    </StyledDormitoryCommitteeRule>
  );
};

export default DormitoryCommitteeRule;

const StyledDormitoryCommitteeRule = styled.div`
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  background-color: ${color.lightblue};
`;

const Title = styled.p`
  ${font.H2}
  color: ${color.black};
`;

const Description = styled.p`
  ${font.p2}
  line-height: 1.8;
`;
