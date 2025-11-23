import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import font from '@styles/font';
import color from '@styles/color';
import IconBottomArrow from '@package/icon/src/IconBottomArrow';
import { DropdownProps } from './Dropdown.types';
import { useDropdown } from './Dropdown.hooks';

const InputDropdown = ({
  label,
  data,
  width = '100%',
  value = '',
  onChange,
  name,
  placeholder = '',
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
    <Container ref={dropdownRef} style={{ width }}>
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

export default InputDropdown;

const Container = styled.div`
  position: relative;
`;

const Label = styled.p`
  ${font.p4}
  color: ${color.gray500};
  margin-bottom: 8px;
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
  height: 50px;
  padding: 0 20px;
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
      border: 1px solid ${color.gray500};
    `;
  }}

  transition: all 0.2s ease;
  margin-bottom: 10px;
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
  margin-top: 0;
  width: ${({ $isMultiple }) => ($isMultiple ? '200%' : '100%')};
  max-height: 240px;
  overflow-y: auto;
  background-color: ${color.white};
  box-shadow:
    -4px -4px 4px 0px rgba(0, 0, 0, 0.05),
    4px 4px 4px 0px rgba(0, 0, 0, 0.05);
  grid-template-columns: ${({ $isMultiple }) =>
    $isMultiple ? '1fr 1fr' : '1fr'};
  border-radius: 8px;
`;

const DropdownItem = styled.button<{ $isSelected: boolean }>`
  ${font.p4}
  display: flex;
  align-items: center;
  padding: 8px 10px;
  width: 100%;
  text-align: center;
  background-color: ${({ $isSelected }) =>
    $isSelected ? color.lightblue : 'transparent'};
  color: ${color.black};
  font-weight: 300;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
  min-height: 34px;

  &:hover {
    background-color: ${color.lightblue};
  }
`;
