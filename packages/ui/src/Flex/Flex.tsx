'use client';

import { useFlex } from './Flex.hooks';
import { StyledFlex } from './Flex.styles';
import type { FlexProps } from './Flex.types';

const Flex = (props: FlexProps) => {
  const { element, styledProps, children, restProps } = useFlex(props);

  return (
    <StyledFlex as={element} {...styledProps} {...restProps}>
      {children}
    </StyledFlex>
  );
};

export default Flex;
