import color from '@styles/color';
import styled from '@emotion/styled';
import font from '@styles/font';
import { EditSquare } from '@package/icon';
import { ROUTES } from '@/constants/common/constants';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface MainRuleProps {
  canEdit: boolean;
}

const MainRule = ({ canEdit }: MainRuleProps) => {
  return (
    <StyledMainRule>
      <div>
        <ReactMarkdown>
          {`분실물 관리 서비스, 어디를 찾아주셔서 감사합니다.

## 사용 방법은?
1. 검색을 통해 분실물이 접수되었나 확인
2. 자신의 분실물을 찾았다면, 소유권 주장 진행
3. 확인 후 학생회나 학생자치부 선생님을 통해 지급

## 분실물 발견 시에는?
2학년 2반 이하은 (@han22.\_x), 학생자치부 진예빈, 유근찬 선생님을 통해 분실물 접수  
→ 상점 지급
&nbsp;
&nbsp;
&nbsp;
## 찾아가야 하는 기한은?
한 학기가 끝날 때마다 전체 분실물 폐기 → 분실 시 학기가 지나기 전 찾아가야 함.  
학기가 지나고 폐기된 분실물을 다시 찾기는 불가`}
        </ReactMarkdown>
      </div>
      {canEdit && (
        <Link href={ROUTES.MARKDOWN}>
          <EditSquare />
        </Link>
      )}
    </StyledMainRule>
  );
};

export default MainRule;

const StyledMainRule = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding: 20px 30px;
  border-radius: 20px;
  gap: 16px;
  background-color: ${color.lightblue};
`;

const Title = styled.p`
  ${font.H1}
  margin: 0;
`;
