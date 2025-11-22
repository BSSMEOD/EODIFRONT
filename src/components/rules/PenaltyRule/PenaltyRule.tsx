import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import Th from '@ui/Table/Th';
import Td from '@ui/Table/Td';

interface PenaltyRuleProps {
  id?: string;
}

const PenaltyRule = ({ id }: PenaltyRuleProps) => {
  const data = [
    {
      category: '환경조성 및 봉사활동',
      content: '교복 착용 상태 불량',
      score: '1',
    },
    { category: '', content: '사복 착용', score: '2' },
    {
      category: '',
      content: '교복 착용 필요한 행사 참여 복장 불량',
      score: '3',
    },
    {
      category: '기초 질서',
      content: '조식, 중식, 석식 새치기 적발',
      score: '1',
    },
    { category: '', content: '아침 시간 활동 불량', score: '1' },
    {
      category: '선행 및 모범',
      content: '본인 구역 학교 환경정화 활동 태만',
      score: '1',
    },
    { category: '', content: '고성방가, 폭언, 괴성', score: '1' },
    { category: '', content: '쓰레기 불법 투기, 침 뱉음', score: '2' },
    {
      category: '',
      content:
        '방과 후 수업 및 방과후 자습 무단 불참, 미확인 이석 (교사당 2점 부여)',
      score: '2',
    },
    {
      category: '',
      content: '교내 공공시설(화장실, 식수대 등) 이용 무질서 행위',
      score: '1',
    },
    { category: '', content: '교내에서 위험한 행동', score: '2' },
    { category: '', content: '허용되지 않는 음식 반입', score: '2' },
    {
      category: '',
      content: '미풍양속 위반행위 (위생관리, 속옷 차림 활보 등)',
      score: '2',
    },
    { category: '', content: '허용시간 외 휴대폰 소지', score: '3' },
    { category: '', content: '흡연 및 음주 사항 방조 및 은폐', score: '5' },
    { category: '', content: '기물 파손 행위', score: '1~5' },
    {
      category: '',
      content: '수업 준비 미흡 또는 수업 및 자습 태도 불량',
      score: '1',
    },
    {
      category: '',
      content: '교사의 지도 거부 및 불이행',
      score: '3',
      isImportant: true,
    },
    { category: '기숙사 생활', content: '점호 상태 불량', score: '1' },
    {
      category: '',
      content: '공동실(베르실, 정독실 등) 및 세탁실, 공용 기기 사용 수칙 위반',
      score: '1',
    },
    {
      category: '',
      content: '기숙사 담당 구역 환경 정화 활동 태만',
      score: '1',
    },
    { category: '', content: '방 정리정돈 및 위생상태 불량', score: '2' },
    { category: '', content: '전열기구 등 화재 위험 물질 반입', score: '2' },
    { category: '', content: '소등 후 방문 무단 개방', score: '2' },
    { category: '', content: '일과 중 기숙사 출입', score: '2' },
    {
      category: '',
      content: '일과 시간(등교시간, 식사시간 등) 및 활동 장소 미준수',
      score: '2',
    },
    {
      category: '',
      content: '사감 및 담당 지도교사의 지도 거부 및 불이행',
      score: '3',
      isImportant: true,
    },
    { category: '', content: '입소 신고 누락', score: '3' },
    { category: '', content: '점호시간 무단 불참', score: '3' },
    {
      category: '',
      content: '출입 금지 구역 이용 (남녀 복도 포함)',
      score: '3',
    },
    {
      category: '',
      content: '소등 후 고성, 식사, 이동 등 타인의 숙면 방해 행위',
      score: '5',
    },
    { category: '', content: '타 호실 출입', score: '5' },
    { category: '', content: '타 호실 취침', score: '10' },
  ];

  return (
    <StyledPenaltyRule id={id}>
      <Title>벌점 기준</Title>
      <TableWrapper>
        <Row>
          <Th
            width={240}
            height={36}
            backgroundColor={color.primary}
            borderTopLeftRadius={10}
          >
            구분
          </Th>
          <Th width={'100%'} height={36} backgroundColor={color.primary}>
            내용
          </Th>
          <Th
            width={80}
            height={36}
            backgroundColor={color.primary}
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
              {item.isImportant && <ImportantMark>*</ImportantMark>}
            </Td>
            <Td width={80} height={44}>
              {item.score}
            </Td>
          </Row>
        ))}
      </TableWrapper>
      <Notice>
        <ImportantMark>*</ImportantMark>
        중대사안. 생활교육위원회 회부 후 최대 5점까지 추가 부여 가능
      </Notice>
    </StyledPenaltyRule>
  );
};

export default PenaltyRule;

const StyledPenaltyRule = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  border-radius: 20px;
  background-color: ${color.lightblue};
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

const CategoryTd = styled(Td)`
  font-weight: 500;
`;

const ContentTd = styled(Td)`
  flex: 1;
  justify-content: flex-start;
  padding-left: 12px;
`;

const ImportantMark = styled.span`
  color: ${color.red};
  font-weight: 600;
  margin-left: 2px;
`;

const Notice = styled.p`
  ${font.p3}
  margin-top: 16px;
  color: ${color.black};
`;
