import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonSize, ButtonStyleType } from './Button.type';
import { addPX } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
  size?: ButtonSize;
  outlined?: boolean;
  width?: number | string;
  height?: number | string;
}

export const Button = ({
  styleType = 'PRIMARY',
  size = 'medium',
  outlined = false,
  width = 'auto',
  height = 'auto',
  disabled = false,
  children,
  ...restProps
}: ButtonProps) => {
  const widthValue = addPX(width);
  const heightValue = addPX(height);

  const baseStyle = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    width: ${widthValue};
    height: ${heightValue};

    ${getButtonStyle[styleType](outlined, size)}
  `;

  return (
    <button css={baseStyle} {...restProps}>
      {children}
    </button>
  );
};
