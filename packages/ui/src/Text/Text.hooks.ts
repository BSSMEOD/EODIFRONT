import type { AllowedHTMLElement, TextProps } from './Text.types';

export const useText = (props: TextProps) => {
  const {
    variant = 'p2',
    color = 'black',
    width = 'auto',
    textAlign = 'left',
    whiteSpace = 'normal',
    ellipsis = false,
    as,
    children,
    ...restProps
  } = props;

  const getDefaultElement = (): AllowedHTMLElement => {
    if (as) return as;

    if (variant === 'D1') return 'div';
    if (variant.startsWith('H'))
      return variant.toLowerCase() as AllowedHTMLElement;
    return 'p';
  };

  const element = getDefaultElement();

  const styledProps = {
    variant,
    color,
    width,
    textAlign,
    whiteSpace,
    ellipsis,
  };

  return {
    element,
    styledProps,
    children,
    restProps,
  };
};
