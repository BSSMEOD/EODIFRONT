import color from '@styles/color';
import styled from '@emotion/styled';
import font from '@styles/font';
import { EditSquare } from '@/icons';
import { ROUTES } from '@/constants/common/constants';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useIntroduceQuery } from '@services/introduce/queries';

interface MainRuleProps {
  canEdit: boolean;
}

const MainRule = ({ canEdit }: MainRuleProps) => {
  const { data } = useIntroduceQuery();

  return (
    <StyledMainRule>
      <div>
        <ReactMarkdown>{data?.content?.replace(/\n/g, '\n\n') || ''}</ReactMarkdown>
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
  gap: 20px;
  width: 100%;
  background-color: ${color.lightblue};
`;

const Title = styled.p`
  ${font.H1}
`;

const SubTitle = styled.p`
  ${font.H2}
  line-height: 1.5;
`;

const Description = styled.p`
  ${font.p2}
  line-height: 1.5;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
