'use client';

import styled from '@emotion/styled';
import type { FlexProps } from './Flex.types';

const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => gap};
  flex-wrap: ${({ wrap }) => wrap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const Flex = (props: FlexProps) => {
  const {
    direction = 'row',
    justify = 'flex-start',
    align = 'stretch',
    gap = 0,
    wrap = 'nowrap',
    width = 'auto',
    height = 'auto',
    as = 'div',
    children,
    ...restProps
  } = props;

  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <StyledFlex
      as={as}
      direction={direction}
      justify={justify}
      align={align}
      gap={gapValue}
      wrap={wrap}
      width={width}
      height={height}
      {...restProps}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
