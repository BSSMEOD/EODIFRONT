import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import font from '@styles/font';
import color from '@styles/color';
import { addPX } from '@utils/addPX';
import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import Text from '@components/common/Text/Text';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  name: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  label?: string;
  readonly?: boolean;
  onChange?: (value: string, name: string) => void;
  value?: string;
  rightIcon?: ReactNode;
}

const Input = ({
  name,
  value = '',
  type = 'text',
  width = 'auto',
  height = 'auto',
  label,
  placeholder,
  onChange,
  rightIcon,
  ...restProps
}: InputProps) => {
  const handleChange = (inputValue: string | Date | null) => {
    let updateValue: string;

    if (inputValue === null) {
      updateValue = '';
    } else if (inputValue instanceof Date) {
      updateValue = inputValue.toString();
    } else {
      updateValue = inputValue;
    }

    onChange?.(updateValue, name);
  };

  return (
    <Flex direction="column" gap={8} width={addPX(width)}>
      {!!label && (
        <Text variant="p4" color={color.gray400}>
          {label}
        </Text>
      )}
      <InputWrapper>
        <StyledInput
          type={type}
          height={addPX(height)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          data-placeholder={placeholder}
          {...restProps}
        />
        {!!rightIcon && rightIcon}
      </InputWrapper>
    </Flex>
  );
};

const InputWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: text;
  border: 1px solid ${color.gray500};
  padding: 14px 20px;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  height: 24px;
  flex: 1;
  ${font.p2};

  &::placeholder {
    ${font.p2};
    color: ${color.gray300};
  }
`;

export default Input;
