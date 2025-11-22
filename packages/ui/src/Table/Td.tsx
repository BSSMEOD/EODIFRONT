import type { TableProps } from './Table.type';
import color from '@styles/color';
import styled from '@emotion/styled';

const Td = ({
  children,
  width,
  height,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  isBottom = false,
  isTop = false,
  isLeft = false,
  isRight = false,
  isBottomBold = false,
}: TableProps) => {
  return (
    <StyledTd
      style={{
        width,
        height,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      }}
      isBottom={isBottom}
      isTop={isTop}
      isLeft={isLeft}
      isRight={isRight}
      isBottomBold={isBottomBold}
    >
      {children}
    </StyledTd>
  );
};

export default Td;

const StyledTd = styled.div<{
  isBottom: boolean;
  isTop: boolean;
  isLeft: boolean;
  isRight: boolean;
  isBottomBold: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.white};
  color: ${color.black};
  border: 0.5px solid ${color.gray300};
`;
