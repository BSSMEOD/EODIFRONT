import { forwardRef } from 'react';
import IconBottomArrow from '@/icons/src/IconBottomArrow';
import color from '@styles/color';
import styled from '@emotion/styled';
import font from '@styles/font';

interface CustomInputProps {
  onClick?: () => void;
  value?: string;
  text: string;
  hasValue: boolean;
  isOpen: boolean;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ onClick, text, hasValue, isOpen }, ref) => {
    return (
      <DateButton
        onClick={onClick}
        ref={ref}
        type="button"
        $hasValue={hasValue}
        $isOpen={isOpen}
      >
        <span>{text}</span>
        <IconWrapper $isOpen={isOpen}>
          <IconBottomArrow width={11} height={6} color={color.gray500} />
        </IconWrapper>
      </DateButton>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;

const DateButton = styled.button<{ $hasValue: boolean; $isOpen: boolean }>`
  ${font.p2}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 100px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.white};
  border: 1px solid
    ${({ $isOpen }) => ($isOpen ? color.primary : color.gray300)};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    color: ${({ $hasValue }) => ($hasValue ? color.black : color.gray500)};
    white-space: nowrap;
  }

  &:hover {
    border-color: ${color.primary};
  }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;
