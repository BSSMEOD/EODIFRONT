import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';

interface StatusBadgeProps {
  bgColor: string;
  children: React.ReactNode;
}

const StatusBadge = ({ bgColor, children }: StatusBadgeProps) => {
  return <StyledBadge bgColor={bgColor}>{children}</StyledBadge>;
};

const StyledBadge = styled.div<{ bgColor: string }>`
  ${font.p3};
  background: ${({ bgColor }) => bgColor};
  color: ${color.white};
  padding: 2px 8px;
  border-radius: 8px;
`;

export default StatusBadge;
