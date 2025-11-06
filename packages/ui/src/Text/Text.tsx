import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@/styles/font';
import type { AllowedHTMLElement, TextProps } from './Text.types';

const StyledText = styled.span<TextProps>`
  ${({ variant }) => font[variant as keyof typeof font]};
  color: ${({ color: textColor }) =>
    color[textColor as keyof typeof color] || textColor};
  width: ${({ width }) => width};
  text-align: ${({ textAlign }) => textAlign};
  white-space: ${({ whiteSpace, ellipsis }) =>
    ellipsis ? 'nowrap' : whiteSpace};

  ${({ ellipsis }) =>
    ellipsis &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const Text = (props: TextProps) => {
  const {
    variant = 'p2',
    color: textColor = 'black',
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

  return (
    <StyledText
      as={element}
      variant={variant}
      color={textColor}
      width={width}
      textAlign={textAlign}
      whiteSpace={whiteSpace}
      ellipsis={ellipsis}
      {...restProps}
    >
      {children}
    </StyledText>
  );
};

export default Text;
