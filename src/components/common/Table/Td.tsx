import type { TableProps } from './Table.type';
import color from '@styles/color';
import styled from '@emotion/styled';

const Td = ({
  children,
  width,
  height,
  textFont,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}: TableProps) => {
  return (
    <StyledTd
      style={{
        width,
        height,
        font: textFont,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      }}
    >
      {children}
    </StyledTd>
  );
};

export default Td;

const StyledTd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color.white};
  color: ${color.black};
  border: 0.5px solid ${color.gray300};
`;
