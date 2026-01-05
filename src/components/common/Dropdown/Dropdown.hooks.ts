import { useBooleanState } from '@hooks/useBooleanState';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { Data } from '@components/common/Dropdown/Dropdown.types';

export const useDropdown = (
  disabled: boolean,
  onChange: (selectedValue: string, name: string) => void,
  name: string,
  value: string,
  data: readonly Data[] | readonly string[]
) => {
  const {
    value: isOpen,
    setFalse: closeDropdown,
    toggle: handleToggleButtonClick,
  } = useBooleanState();
  const dropdownRef = useOutsideClick(closeDropdown);

  const handleDropdownItemButtonClick = (selectedValue: string) => {
    if (!disabled) {
      onChange(selectedValue, name);
      closeDropdown();
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      handleToggleButtonClick();
    }
  };

  const getDisplayValue = () => {
    if (!value) return '';

    const selectedItem = data.find((item) => {
      if (typeof item === 'string') return item === value;
      return item.value === value;
    });

    if (!selectedItem) return value;
    return typeof selectedItem === 'string' ? selectedItem : selectedItem.label;
  };

  return {
    isOpen,
    closeDropdown,
    handleToggleButtonClick,
    dropdownRef,
    handleDropdownItemButtonClick,
    handleDropdownClick,
    getDisplayValue,
  };
};
