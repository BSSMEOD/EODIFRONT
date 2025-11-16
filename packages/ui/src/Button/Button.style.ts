import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';

export const getButtonStyle = {
  PRIMARY: (outlined: boolean) => css`
    background-color: ${outlined ? color.white : color.primary};
    color: ${outlined ? color.primary : color.white};
    border: ${outlined ? `1.5px solid ${color.primary}` : 'none'};
    padding: 10px 20px;
    font: ${font.p2};

    &:hover {
      background-color: ${color.primary};
      color: ${color.white};
    }
  `,
  SECONDARY: (outlined: boolean) => css`
    background-color: ${outlined ? color.white : color.secondary};
    color: ${outlined ? color.secondary : color.white};
    border: ${outlined ? `1.5px solid ${color.secondary}` : 'none'};
    padding: 10px 20px;
    font: ${font.p2};

    &:hover {
      background-color: ${color.secondary};
      color: ${color.white};
    }
  `,
  TERTIARY: (outlined: boolean) => css`
    background-color: ${color.white};
    color: ${color.black};
    padding: 10px 20px;
    font: ${font.p2};
    &:hover {
      background-color: ${color.gray100};
    }
  `,
  GHOST: (outlined: boolean) => css`
    background-color: ${color.white};
    color: ${color.gray400};
    padding: 10px 20px;
    font: ${font.p2};
    &:hover {
      border: 1.5px solid ${color.gray300};
    }
  `,
};
