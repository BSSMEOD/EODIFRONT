import { css } from '@emotion/react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonSize, ButtonStyleType } from './Button.type';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
  size?: ButtonSize;
  outlined?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Button = (props: ButtonProps) => {
  const {
    styleType = 'PRIMARY',
    size = 'medium',
    outlined = false,
    width = 'auto',
    height = 'auto',
    children,
    ...restProps
  } = props;

  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;

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
