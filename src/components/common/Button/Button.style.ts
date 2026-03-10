import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';
import { ButtonSize, ButtonStyleType } from './Button.type';

const COLOR_MAP = {
  PRIMARY: {
    default: color.primary300,
    disabled: color.primary200,
    hover: color.primary400,
    clicked: color.primary500,
    hoverBg: color.primary100,
    clickedBg: color.primary200,
  },
  SECONDARY: {
    default: color.secondary300,
    disabled: color.secondary200,
    hover: color.secondary400,
    clicked: color.secondary500,
    hoverBg: color.secondary100,
    clickedBg: color.secondary200,
  },
};

const SIZE_MAP = {
  small: {
    defaultPad: '0 12px',
    iconPad: '0 8px',
    typography: font.p3,
    height: '32px',
  },
  medium: {
    defaultPad: '0 16px',
    iconPad: '0 8px',
    typography: font.p2,
    height: '40px',
  },
  big: {
    defaultPad: '0 20px',
    iconPad: '0 10px',
    typography: font.H4,
    height: '44px',
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

const resolveColorStyle = (
  colors: (typeof COLOR_MAP)[keyof typeof COLOR_MAP],
  outlined: boolean
) => {
  if (outlined) {
    return css`
      border: 1.5px solid ${colors.default};
      background-color: ${color.white};
      color: ${colors.default};

      &:hover {
        background-color: ${colors.hoverBg};
      }
      &:active {
        background-color: ${colors.clickedBg};
      }
      &:disabled {
        border-color: ${colors.disabled};
        color: ${colors.disabled};
        background-color: ${color.white};
      }
    `;
  }

  return css`
    background-color: ${colors.default};
    color: ${color.white};

    &:hover {
      background-color: ${colors.hover};
    }
    &:active {
      background-color: ${colors.clicked};
    }
    &:disabled {
      background-color: ${colors.disabled};
    }
  `;
};
export const getButtonStyle = (
  styleType: ButtonStyleType,
  outlined: boolean,
  size: ButtonSize,
  hasIcon: boolean,
  hasText: boolean
) => {
  const colors = COLOR_MAP[styleType];
  const { defaultPad, iconPad, typography, height } = SIZE_MAP[size];
  const padding = resolvePadding(defaultPad, iconPad, hasIcon, hasText);
  const colorStyle = resolveColorStyle(colors, outlined);

  return css`
    height: ${height};
    padding: ${padding};
    ${typography};
    ${colorStyle};
  `;
};
