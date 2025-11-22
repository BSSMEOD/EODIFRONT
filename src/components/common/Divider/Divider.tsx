import styled from '@emotion/styled';
import type React from 'react';
import type { CSSProperties } from 'react';
import color from '@styles/color';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  length?: CSSProperties['width'] | CSSProperties['height'];
  color?: CSSProperties['color'];
}

export const Divider = ({
  orientation = 'horizontal',
  length = '100%',
  color: dividerColor = color.gray200,
  ...props
}: DividerProps) => {
  const lengthValue = typeof length === 'number' ? `${length}px` : length;
  return orientation === 'horizontal' ? (
    <StyledHorizontalDivider
      length={lengthValue}
      color={dividerColor}
      {...props}
    />
  ) : (
    <StyledVerticalDivider
      length={lengthValue}
      color={dividerColor}
      {...props}
    />
  );
};

interface StyledDividerProps {
  length: string;
  color: CSSProperties['color'];
}

const StyledHorizontalDivider = styled.div<StyledDividerProps>`
  width: ${({ length }) => length};
  border-top: 1px solid ${({ color }) => color};
`;

const StyledVerticalDivider = styled.div<StyledDividerProps>`
  height: ${({ length }) => length};
  border-left: 1px solid ${({ color }) => color};
`;
