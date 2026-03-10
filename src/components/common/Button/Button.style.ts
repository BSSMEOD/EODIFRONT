import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';
import { ButtonSize, ButtonStyleType } from './Button.type';

const COLOR_MAP = {
  PRIMARY: color.primary,
  SECONDARY: color.secondary,
};

const SIZE_MAP = {
  small: {
    defaultPad: '0 8px',
    iconPad: '0 2px',
    typography: font.p3,
    height: '24px',
  },
  medium: {
    defaultPad: '0 12px',
    iconPad: '0 4px',
    typography: font.p2,
    height: '32px',
  },
  big: {
    defaultPad: '0 16px',
    iconPad: '0 6px',
    typography: font.H3,
    height: '40px',
  },
};

const resolvePadding = (
  defaultPad: string,
  iconPad: string,
  hasIcon: boolean,
  hasText: boolean
): string => {
  if (hasIcon && hasText) return `${defaultPad} ${iconPad}`;
  if (hasIcon) return iconPad;
  return defaultPad;
};

const resolveColorStyle = (mainColor: string, outlined: boolean) =>
  outlined
    ? css`
        border: 1px solid ${mainColor};
        background-color: ${color.white};
        color: ${mainColor};
      `
    : css`
        background-color: ${mainColor};
        color: ${color.white};
      `;

export const getButtonStyle = (
  styleType: ButtonStyleType,
  outlined: boolean,
  size: ButtonSize,
  hasIcon: boolean,
  hasText: boolean
) => {
  const mainColor = COLOR_MAP[styleType];
  const { defaultPad, iconPad, typography, height } = SIZE_MAP[size];
  const padding = resolvePadding(defaultPad, iconPad, hasIcon, hasText);
  const colorStyle = resolveColorStyle(mainColor, outlined);

  return css`
    height: ${height};
    padding: ${padding};
    ${typography};
    ${colorStyle};
  `;
};
