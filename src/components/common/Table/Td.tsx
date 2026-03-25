import type { CSSProperties } from 'react';
import type { TableProps } from './Table.type';
import color from '@styles/color';
import styled from '@emotion/styled';

interface TdProps extends TableProps {
  style?: CSSProperties;
}

const Td = ({
  children,
  width,
  height,
  textFont,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  style,
}: TdProps) => {
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
        ...style,
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
  box-sizing: border-box;
  background-color: ${color.white};
  color: ${color.black};
  border-left: 0.5px solid ${color.gray300};
  border-right: 0.5px solid ${color.gray300};
  border-bottom: 0.5px solid ${color.gray300};
  border-top: 0.5px solid ${color.gray300};
`;
