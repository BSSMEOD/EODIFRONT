/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonStyleType } from './Button.type';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
  outlined?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    styleType = 'PRIMARY',
    outlined = false,
    children,
    ...restProps
  } = props;

  const baseStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    ${getButtonStyle[styleType](outlined)}
  `;

  return (
    <button css={baseStyle} {...restProps}>
      {children}
    </button>
  );
};
