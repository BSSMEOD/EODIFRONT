import type { TableProps } from './Table.type';
import font from '@styles/font';
import styled from '@emotion/styled';
import color from '@styles/color';

const Th = ({
  children,
  width,
  height,
  backgroundColor,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}: TableProps) => {
  return (
    <StyledTh
      style={{
        width,
        height,
        backgroundColor,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      }}
    >
      {children}
    </StyledTh>
  );
};

export default Th;

const StyledTh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.p2}
  background-color: ${color.primary};
  color: ${color.black};
  border-right: 1px solid ${color.white};
  border-bottom: 1px solid ${color.white};
  &:last-child {
    border-right: none;
  }
`;
