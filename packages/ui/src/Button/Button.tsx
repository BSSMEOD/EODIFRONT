import { css } from '@emotion/react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { getButtonStyle } from './Button.style';
import type { ButtonStyleType } from './Button.type';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonStyleType;
  outlined?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Button = (props: ButtonProps) => {
  const {
    styleType = 'PRIMARY',
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
    width: ${widthValue};
    height: ${heightValue};

    ${getButtonStyle[styleType](outlined)}
  `;

  return (
    <button css={baseStyle} {...restProps}>
      {children}
    </button>
  );
};
