import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';
import { ButtonSize } from './Button.type';

const getSizeStyle = (size: ButtonSize) => {
  switch (size) {
    case 'medium':
      return css`
        padding: 10px 20px;
        ${font.p2};
      `;
    case 'small':
      return css`
        padding: 2px 8px;
        ${font.p3};
      `;
    case 'modal':
      return css`
        padding: 2px 8px;
        ${font.p2};
      `;
    case 'compact':
      return css`
        padding: 5px 20px;
        ${font.p2};
      `;
    default:
      return css`
        padding: 10px 20px;
        ${font.p2};
      `;
  }
};

export const getButtonStyle = {
  PRIMARY: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${outlined ? color.white : color.primary};
    color: ${outlined ? color.primary : color.white};
    border: ${outlined ? `1.5px solid ${color.primary}` : 'none'};
    ${getSizeStyle(size)};

    &:hover {
      background-color: ${color.primary};
      color: ${color.white};
    }
  `,
  SECONDARY: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${outlined ? color.white : color.secondary};
    color: ${outlined ? color.secondary : color.white};
    border: ${outlined ? `1.5px solid ${color.secondary}` : 'none'};
    ${getSizeStyle(size)};

    &:hover {
      background-color: ${color.secondary};
      color: ${color.white};
    }
  `,
  TERTIARY: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${color.white};
    color: ${color.black};
    ${getSizeStyle(size)};
    &:hover {
      background-color: ${color.gray100};
    }
  `,
  GHOST: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${color.white};
    color: ${color.black};
    ${getSizeStyle(size)};
    border: 0.5px solid ${color.gray200};

    &:hover {
      background-color: ${color.gray100};
    }
  `,
  GHOST_SECONDARY: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${color.white};
    color: ${color.secondary};
    ${getSizeStyle(size)};
    border: 1px solid ${color.secondary};

    &:hover {
      background-color: ${color.gray100};
    }
  `,
  GHOST_DANGER: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${color.white};
    color: ${color.red};
    ${getSizeStyle(size)};
    border: 1px solid ${color.red};

    &:hover {
      background-color: ${color.red};
      color: ${color.white};
      border-color: ${color.red};
    }
  `,
  DANGER: (outlined: boolean, size: ButtonSize) => css`
    background-color: ${color.red};
    color: ${color.white};
    ${getSizeStyle(size)};
    border: 1px solid ${color.red};
  `,
};
