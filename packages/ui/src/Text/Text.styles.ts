import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@/styles/font';
import type { StyledTextProps } from './Text.types';

export const StyledText = styled.span<StyledTextProps>`
  ${({ variant }) => font[variant]};
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
    white-space: nowrap;
    `}
`;
