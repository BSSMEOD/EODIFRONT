import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import font from '@styles/font';
import color from '@styles/color';
import IconBottomArrow from '@/icons/src/IconBottomArrow';
import { DropdownProps } from '@components/common/Dropdown/Dropdown.types';
import { useDropdown } from '@components/common/Dropdown/Dropdown.hooks';
import { addPX } from '@/utils';

const Dropdown = ({
  label,
  data,
  width = '320px',
  value = '',
  onChange,
  name,
  placeholder = '선택해주세요',
  doubled,
  isError = false,
  background = 'White',
  disabled = false,
}: DropdownProps) => {
  const {
    isOpen,
    dropdownRef,
    handleDropdownItemButtonClick,
    handleDropdownClick,
    getDisplayValue,
  } = useDropdown(disabled, onChange, name, value, data);

  return (
    <Container ref={dropdownRef} width={addPX(width)}>
      {label && <Label>{label}</Label>}
      <StyledDropdown
        onClick={handleDropdownClick}
        $isOpen={isOpen}
        $isError={isError}
        $background={background}
        $disabled={disabled}
      >
        <ValueText $hasValue={!!value}>
          {getDisplayValue() || placeholder}
        </ValueText>
        <IconWrapper $isOpen={isOpen}>
          <IconBottomArrow color={color.gray500} width={11} height={6} />
        </IconWrapper>
      </StyledDropdown>
      <DropdownListBox $isOpen={isOpen && !disabled}>
        <DropdownList $isMultiple={data.length > (doubled ?? 100)}>
          {data?.map((item, index) => {
            const isString = typeof item === 'string';
            const dropdownLabel = isString ? item : item.label;
            const dropdownValue = isString ? item : item.value;
            const isSelected = dropdownValue === value;

            return (
              <DropdownItem
                key={`dropdown-${index}`}
                type="button"
                onClick={() => handleDropdownItemButtonClick(dropdownValue)}
                $isSelected={isSelected}
              >
                {dropdownLabel}
              </DropdownItem>
            );
          })}
        </DropdownList>
      </DropdownListBox>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  position: relative;
`;

const Label = styled.p`
  ${font.p3}
  color: ${color.gray500};
  margin-bottom: 4px;
`;

const StyledDropdown = styled.div<{
  $isOpen: boolean;
  $isError: boolean;
  $background: 'White' | 'Gray';
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $background }) =>
    $background === 'White' ? color.white : color.gray100};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  ${({ $isOpen, $disabled, $isError }) => {
    if ($isError) {
      return css`
        border: 1px solid ${color.red};
      `;
    }
    if ($isOpen && !$disabled) {
      return css`
        border: 1px solid ${color.primary};
        outline: 2px solid rgba(135, 206, 235, 0.25);
      `;
    }
    return css`
      border: 1px solid ${color.gray300};
    `;
  }}

  transition: all 0.2s ease;
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const ValueText = styled.span<{ $hasValue: boolean }>`
  ${font.p2}
  color: ${({ $hasValue }) => ($hasValue ? color.black : color.gray500)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropdownListBox = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const DropdownList = styled.div<{ $isMultiple?: boolean }>`
  display: grid;
  z-index: 10;
  position: absolute;
  margin-top: 8px;
  padding: 8px 0;
  width: ${({ $isMultiple }) => ($isMultiple ? '200%' : '100%')};
  max-height: 240px;
  overflow-y: auto;
  background-color: ${color.white};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  grid-template-columns: ${({ $isMultiple }) =>
    $isMultiple ? '1fr 1fr' : '1fr'};
  border-radius: 6px;
`;

const DropdownItem = styled.button<{ $isSelected: boolean }>`
  ${font.p2}
  display: flex;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  text-align: left;
  background-color: ${({ $isSelected }) =>
    $isSelected ? color.lightblue : 'transparent'};
  color: ${color.black};
  font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 400)};
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${color.lightblue};
  }
`;
