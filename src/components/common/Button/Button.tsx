import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonSize, ButtonStyleType } from './Button.type';
import { addPX } from '@/utils';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
  size?: ButtonSize;
  outlined?: boolean;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
}

type ButtonProps = ButtonBaseProps &
  (
    | {
        icon: React.ReactNode;
        children?: React.ReactNode;
      }
    | {
        icon?: undefined;
        children: React.ReactNode;
      }
  );

export const Button = ({
  styleType = 'PRIMARY',
  size = 'medium',
  outlined = false,
  width = 'auto',
  disabled = false,
  icon,
  children,
  ...restProps
}: ButtonProps) => {
  const widthValue = addPX(width);
  const hasIcon = !!icon;
  const hasText = !!children;

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

    ${getButtonStyle(styleType, outlined, size, hasIcon, hasText)}
  `;

  return (
    <button css={baseStyle} {...restProps}>
      {children}
    </button>
  );
};
