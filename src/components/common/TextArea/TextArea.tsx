import React from 'react';
import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';
import { addPX } from '@utils/addPX';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string | number;
  height?: string | number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  width = '100%',
  height = 'auto',
  value,
  onChange,
  ...props
}: TextAreaProps) => {
  const widthValue = addPX(width);
  const heightValue = addPX(height);

  return (
    <StyledTextArea
      width={widthValue}
      height={heightValue}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

interface StyledTextAreaProps {
  width: string;
  height: string;
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${font.p2}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${color.gray500};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

export default TextArea;
