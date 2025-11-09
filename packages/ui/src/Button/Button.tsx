/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonStyleType } from './Button.type';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
}

export const Button = ({
  styleType = 'PRIMARY',
  children,
  ...props
}: ButtonProps) => {
  const baseStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    ${getButtonStyle[styleType]}
  `;

  return (
    <button css={baseStyle} {...props}>
      {children}
    </button>
  );
};
