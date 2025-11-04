import type { FlexProps } from './Flex.types';

export const useFlex = (props: FlexProps) => {
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

  const styledProps = {
    direction,
    justify,
    align,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    wrap,
    width,
    height,
  };

  return {
    element: as,
    styledProps,
    children,
    restProps,
  };
};
