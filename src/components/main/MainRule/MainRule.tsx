'use client';

import color from '@styles/color';
import styled from '@emotion/styled';
import { EditSquare } from '@/icons';
import { ROUTES } from '@/constants/common/constants';
import Link from 'next/link';
import { useIntroduceQuery } from '@services/introduce/queries';
import '@toast-ui/editor/dist/toastui-editor.css';
import dynamic from 'next/dynamic';

interface MainRuleProps {
  canEdit: boolean;
}

const Viewer = dynamic(
  () => import('@toast-ui/react-editor').then((m) => m.Viewer),
  { ssr: false }
);

const MainRule = ({ canEdit }: MainRuleProps) => {
  const { data } = useIntroduceQuery();

  return (
    <StyledMainRule>
      {data ? <Viewer initialValue={data.content} /> : <div>불러오는중...</div>}
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
  background-color: ${color.primary100};
`;
