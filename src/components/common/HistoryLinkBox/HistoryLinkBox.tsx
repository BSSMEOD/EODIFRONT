import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { ArrowRightTop } from '@/icons';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { addPX } from '@utils/addPX';

interface HistoryLinkBoxProps {
  title: string;
  count: number;
  route: string;
  height: string | number;
}

const HistoryLinkBox = ({
  title,
  count,
  route,
  height,
}: HistoryLinkBoxProps) => {
  return (
    <StyledHistoryLinkBox height={addPX(height)} href={route}>
      <Flex direction="column">
        <Text variant="p2">{title}</Text>
        <Text variant="H1">{count}건</Text>
      </Flex>
      <ArrowRightTop />
    </StyledHistoryLinkBox>
  );
};

interface StyledHistoryLinkBoxProps {
  height: CSSProperties['height'];
}

const StyledHistoryLinkBox = styled(Link)<StyledHistoryLinkBoxProps>`
  border: 1px solid ${color.gray200};
  height: ${({ height }) => height};
  padding: 20px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 12px;
`;

export default HistoryLinkBox;
