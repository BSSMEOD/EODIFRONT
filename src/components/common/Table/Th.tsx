import type { TableProps } from './Table.type';
import font from '@styles/font';
import styled from '@emotion/styled';
import color from '@styles/color';

const Th = ({
  children,
  width,
  height,
  textColor,
  textFont,
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
        color: textColor,
        font: textFont,
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
  font-weight: 500;
  color: ${color.black};
  background-color: ${color.primary300};
  border-right: 1px solid ${color.white};
  border-bottom: 1px solid ${color.white};
  &:last-child {
    border-right: none;
  }
`;
