import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';

interface PenaltyRuleProps {
  id?: string;
}

const PenaltyRule = ({ id }: PenaltyRuleProps) => {
  const data = [
    {
      category: '환경조성 및 봉사활동',
      items: [
        { content: '교복 착용 상태 불량', score: '1' },
        { content: '사복 착용', score: '2' },
        { content: '교복 착용 필요한 행사 참여 복장 불량', score: '3' },
      ],
    },
    {
      category: '기초 질서',
      items: [
        { content: '조식, 중식, 석식 새치기 적발', score: '1' },
        { content: '아침 시간 활동 불량', score: '1' },
      ],
    },
    {
      category: '선행 및 모범',
      items: [
        { content: '본인 구역 학교 환경정화 활동 태만', score: '1' },
        { content: '고성방가, 폭언, 괴성', score: '1' },
        { content: '쓰레기 불법 투기, 침 뱉음', score: '2' },
        {
          content:
            '방과 후 수업 및 방과후 자습 무단 불참, 미확인 이석 (교사당 2점 부여)',
          score: '2',
        },
        {
          content: '교내 공공시설(화장실, 식수대 등) 이용 무질서 행위',
          score: '1',
        },
        { content: '교내에서 위험한 행동', score: '2' },
        { content: '허용되지 않는 음식 반입', score: '2' },
        {
          content: '미풍양속 위반행위 (위생관리, 속옷 차림 활보 등)',
          score: '2',
        },
        { content: '허용시간 외 휴대폰 소지', score: '3' },
        { content: '흡연 및 음주 사항 방조 및 은폐', score: '5' },
        { content: '기물 파손 행위', score: '1~5' },
        { content: '수업 준비 미흡 또는 수업 및 자습 태도 불량', score: '1' },
        {
          content: '교사의 지도 거부 및 불이행',
          score: '3',
          isImportant: true,
        },
      ],
    },
    {
      category: '기숙사 생활',
      items: [
        { content: '점호 상태 불량', score: '1' },
        {
          content:
            '공동실(베르실, 정독실 등) 및 세탁실, 공용 기기 사용 수칙 위반',
          score: '1',
        },
        { content: '기숙사 담당 구역 환경 정화 활동 태만', score: '1' },
        { content: '방 정리정돈 및 위생상태 불량', score: '2' },
        { content: '전열기구 등 화재 위험 물질 반입', score: '2' },
        { content: '소등 후 방문 무단 개방', score: '2' },
        { content: '일과 중 기숙사 출입', score: '2' },
        {
          content: '일과 시간(등교시간, 식사시간 등) 및 활동 장소 미준수',
          score: '2',
        },
        {
          content: '사감 및 담당 지도교사의 지도 거부 및 불이행',
          score: '3',
          isImportant: true,
        },
        { content: '입소 신고 누락', score: '3' },
        { content: '점호시간 무단 불참', score: '3' },
        { content: '출입 금지 구역 이용 (남녀 복도 포함)', score: '3' },
        {
          content: '소등 후 고성, 식사, 이동 등 타인의 숙면 방해 행위',
          score: '5',
        },
        { content: '타 호실 출입', score: '5' },
        { content: '타 호실 취침', score: '10' },
      ],
    },
  ];

  return (
    <StyledPenaltyRule id={id}>
      <Title>벌점 기준</Title>
      <TableWrapper>
        <Row>
          <Th
            width={240}
            height={36}
            backgroundColor={color.primary300}
            borderTopLeftRadius={10}
            style={{ flexShrink: 0 }}
          >
            구분
          </Th>
          <Th
            height={36}
            backgroundColor={color.primary300}
            style={{ flex: 1 }}
          >
            내용
          </Th>
          <Th
            width={80}
            height={36}
            backgroundColor={color.primary300}
            borderTopRightRadius={10}
            style={{ flexShrink: 0 }}
          >
            점수
          </Th>
        </Row>
        {data.map((group, groupIndex) => (
          <Row key={groupIndex}>
            <Td width={240} height={44 * group.items.length}>
              {group.category}
            </Td>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {group.items.map((item, itemIndex) => (
                <Row key={itemIndex}>
                  <Td
                    height={44}
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      paddingLeft: 16,
                    }}
                  >
                    {item.content}
                    {item.isImportant && <Asterisk>*</Asterisk>}
                  </Td>
                  <Td width={80} height={44} style={{ flexShrink: 0 }}>
                    {item.score}
                  </Td>
                </Row>
              ))}
            </div>
          </Row>
        ))}
      </TableWrapper>
      <Notice>
        <Asterisk>*</Asterisk>
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
  gap: 20px;
  padding: 20px 30px;
  border-radius: 20px;
  background-color: ${color.primary100};
`;

const Title = styled.p`
  ${font.H2}
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

const Asterisk = styled.span`
  color: ${color.red};
  ${font.p2};
`;

const Notice = styled.p`
  ${font.p3}
  margin-top: 16px;
  color: ${color.black};
`;
