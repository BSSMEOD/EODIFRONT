import { css } from '@emotion/react';
import color from '@styles/color';
import font from '@styles/font';

export const getButtonStyle = {
  PRIMARY: css`
    background-color: ${color.primary};
    color: ${color.white};
    padding: 10px 20px;
    font: ${font.p2};
  `,
  SECONDARY: css`
    background-color: ${color.secondary};
    color: ${color.white};
    padding: 10px 20px;
    font: ${font.p2};
  `,
  TERTIARY: css`
    background-color: ${color.white};
    color: ${color.black};
    padding: 10px 20px;
    font: ${font.p2};
    &:hover {
      background-color: ${color.gray100};
    }
  `,
  QUATERNARY: css`
    background-color: ${color.white};
    color: ${color.black};
    border: 1px solid ${color.secondary};
    padding: 10px 20px;
    font: ${font.p2};
    &:hover {
      background-color: ${color.secondary};
    }
  `,
  DISABLED: css`
    background-color: ${color.white};
    color: ${color.gray400};
    padding: 10px 20px;
    font: ${font.p2};
    &:hover {
      border: 1.5px solid ${color.gray300};
    }
  `,
};
