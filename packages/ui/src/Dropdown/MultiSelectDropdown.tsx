'use client';

import { useBooleanState } from '@hooks/useBooleanState';
import { useOutsideClick } from '@hooks/useOutsideClick';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import font from '@styles/font';
import color from '@styles/color';
import IconBottomArrow from '@package/icon/src/IconBottomArrow';
import { MultiSelectDropdownProps } from './Dropdown.types';

const MultiSelectDropdown = ({
  label,
  data,
  width = '320px',
  value = [],
  onChange,
  name,
  placeholder = '선택해주세요',
  disabled = false,
}: MultiSelectDropdownProps) => {
  const {
    value: isOpen,
    setFalse: closeDropdown,
    toggle: handleToggleButtonClick,
  } = useBooleanState();
  const dropdownRef = useOutsideClick(closeDropdown);

  const handleCheckboxChange = (selectedValue: string) => {
    if (!disabled) {
      const newValues = value.includes(selectedValue)
        ? value.filter((v) => v !== selectedValue)
        : [...value, selectedValue];
      onChange(newValues, name);
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      handleToggleButtonClick();
    }
  };

  const getDisplayValue = () => {
    if (value.length === 0) {
      return placeholder;
    }
    if (value.length === 1) {
      return value[0];
    }
    return `${value[0]} 외 ${value.length - 1}개`;
  };

  return (
    <Container ref={dropdownRef} style={{ width }}>
      {label && <Label>{label}</Label>}
      <StyledDropdown
        onClick={handleDropdownClick}
        $isOpen={isOpen}
        $disabled={disabled}
      >
        <ValueText $hasValue={value.length > 0}>{getDisplayValue()}</ValueText>
        <IconWrapper $isOpen={isOpen}>
          <IconBottomArrow color={color.gray500} width={11} height={6} />
        </IconWrapper>
      </StyledDropdown>
      <DropdownListBox $isOpen={isOpen && !disabled}>
        <DropdownListWrapper>
          <DropdownList>
            {data?.map((item, index) => {
              const isSelected = value.includes(item);

              return (
                <DropdownItem key={`dropdown-${index}`}>
                  <CheckboxWrapper>
                    <Checkbox
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <CheckboxLabel>{item}</CheckboxLabel>
                  </CheckboxWrapper>
                </DropdownItem>
              );
            })}
          </DropdownList>
          <ApplyButton onClick={closeDropdown}>완료</ApplyButton>
        </DropdownListWrapper>
      </DropdownListBox>
    </Container>
  );
};

export default MultiSelectDropdown;

const Container = styled.div`
  position: relative;
`;

const Label = styled.p`
  ${font.p3}
  color: ${color.gray500};
  margin-bottom: 4px;
`;

const StyledDropdown = styled.div<{
  $isOpen: boolean;
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
  background-color: ${color.white};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  ${({ $isOpen, $disabled }) => {
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

const DropdownListWrapper = styled.div`
  z-index: 10;
  position: absolute;
  margin-top: 10px;
  padding: 20px;
  width: max-content;
  min-width: 100%;
  max-height: none;
  background-color: ${color.white};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: 1px solid ${color.gray200};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DropdownList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, auto));
  gap: 10px 10px;
`;

const DropdownItem = styled.div``;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  ${font.p2}
  color: ${color.black};
  cursor: pointer;
  white-space: nowrap;
`;

const ApplyButton = styled.button`
  align-self: flex-end;
  padding: 4px 36px;
  background-color: ${color.secondary};
  color: ${color.white};
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
