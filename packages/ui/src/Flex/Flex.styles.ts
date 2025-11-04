import styled from '@emotion/styled';
import type { StyledFlexProps } from './Flex.types';

export const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => gap};
  flex-wrap: ${({ wrap }) => wrap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
