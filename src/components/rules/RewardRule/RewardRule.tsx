import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import Th from '@ui/Table/Th';
import Td from '@ui/Table/Td';

interface RewardRuleProps {
  id?: string;
}

const RewardRule = ({ id }: RewardRuleProps) => {
  const data = [
    {
      category: '환경조성 및 봉사활동',
      content: '자발적 청소 활동',
      score: '1',
    },
    {
      category: '',
      content: '학급 및 학교 행사 시 헌신적인 환경조성 활동',
      score: '1',
    },
    {
      category: '',
      content: '학교 행사 및 교사 업무 보조 (봉사활동 시간과 중복 인정 X)',
      score: '1',
    },
    { category: '신고활동', content: '분실물 습득 후 최초 신고자', score: '1' },
    { category: '', content: '안전 사고 위험 요소 신고', score: '1' },
    {
      category: '선행 및 모범',
      content: '예절이 뛰어나 모범이 되는 경우',
      score: '1',
    },
    { category: '', content: '몸이 아픈 학우에게 도움을 준 경우', score: '1' },
    { category: '', content: '수업 참여 태도가 우수한 경우', score: '1~2' },
    {
      category: '',
      content: '학교 및 학급 행사에 적극적으로 참여한 경우',
      score: '1',
    },
    { category: '', content: '대외적으로 학교에 공헌한 경우', score: '3' },
    {
      category: '',
      content: '남다른 선행 등의 미담 사례 (교사에 한함)',
      score: '3',
    },
    { category: '', content: '대외에서 선행을 인정받은 경우', score: '5' },
    {
      category: '',
      content:
        '맡은 역할을 꾸준히 성실하게 수행하는 경우 (한 달 기준, 1번 부여 가능)',
      score: '3~5',
    },
  ];

  return (
    <StyledRewardRule id={id}>
      <Title>상점 기준</Title>
      <TableWrapper>
        <Row>
          <Th
            width={240}
            height={36}
            backgroundColor={color.secondary}
            borderTopLeftRadius={10}
          >
            구분
          </Th>
          <Th width={'100%'} height={36} backgroundColor={color.secondary}>
            내용
          </Th>
          <Th
            width={80}
            height={36}
            backgroundColor={color.secondary}
            borderTopRightRadius={10}
          >
            점수
          </Th>
        </Row>
        {data.map((item, index) => (
          <Row key={index}>
            <Td width={240} height={44}>
              {item.category}
            </Td>
            <Td width={'100%'} height={44}>
              {item.content}
            </Td>
            <Td width={80} height={44}>
              {item.score}
            </Td>
          </Row>
        ))}
      </TableWrapper>
    </StyledRewardRule>
  );
};

export default RewardRule;

const StyledRewardRule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  border-radius: 20px;
  background-color: ${color.lightgreen};
`;

const Title = styled.p`
  ${font.H2}
  margin-bottom: 16px;
  color: ${color.black};
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

