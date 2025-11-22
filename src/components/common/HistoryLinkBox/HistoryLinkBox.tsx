import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';
import { ArrowRightTop } from '@package/icon';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { addPX } from '@utils/addPX';

interface HistoryLinkBoxProps {
  title: string;
  count: number;
  route: string;
  height: CSSProperties['height'];
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
