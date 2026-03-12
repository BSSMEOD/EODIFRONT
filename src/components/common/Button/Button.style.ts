import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';
import { ButtonSize, ButtonStyleType } from './Button.type';

const COLOR_MAP = {
  PRIMARY: {
    default: color.primary300,
    disabled: color.primary200,
    filled: {
      hover: color.primary400,
      clicked: color.primary500,
    },
    outlined: {
      hover: color.primary100,
      clicked: color.primary200,
    },
  },
  SECONDARY: {
    default: color.secondary300,
    disabled: color.secondary200,
    filled: {
      hover: color.secondary400,
      clicked: color.secondary500,
    },
    outlined: {
      hover: color.secondary100,
      clicked: color.secondary200,
    },
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
  outlined: boolean,
  active: boolean
) => {
  if (outlined) {
    return css`
      border: 1.5px solid ${colors.default};
      background-color: ${color.white};
      color: ${colors.default};
      ${active && `background-color: ${colors.outlined.clicked};`}

      &:hover {
        ${!active && `background-color: ${colors.outlined.hover}`};
      }
      &:active {
        background-color: ${colors.outlined.clicked};
      }
      &:disabled {
        border-color: ${colors.disabled};
        color: ${colors.disabled};
        background-color: ${color.white};

        svg {
          fill: ${colors.disabled};
        }
      }

      svg {
        fill: ${colors.default};
      }
    `;
  }

  return css`
    background-color: ${colors.default};
    color: ${color.white};
    ${active && `background-color: ${colors.filled.clicked};`}

    &:hover {
      ${!active && `background-color: ${colors.filled.hover}`}
    }
    &:active {
      background-color: ${colors.filled.clicked};
    }
    &:disabled {
      background-color: ${colors.disabled};
    }

    svg {
      fill: ${color.white};
    }
  `;
};
export const getButtonStyle = (
  styleType: ButtonStyleType,
  outlined: boolean,
  size: ButtonSize,
  hasIcon: boolean,
  hasText: boolean,
  active: boolean
) => {
  const colors = COLOR_MAP[styleType];
  const { defaultPad, iconPad, typography, height } = SIZE_MAP[size];
  const padding = resolvePadding(defaultPad, iconPad, hasIcon, hasText);
  const colorStyle = resolveColorStyle(colors, outlined, active);

  return css`
    height: ${height};
    padding: ${padding};
    ${typography};
    ${colorStyle};
  `;
};
