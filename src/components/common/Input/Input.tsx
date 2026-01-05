import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import font from '@styles/font';
import color from '@styles/color';
import { addPX } from '@utils/addPX';
import { ReactNode } from 'react';
import Text from '@components/common/Text/Text';
import { BaseInputProps } from '@components/common/Input/Input.types';

export interface InputProps extends BaseInputProps {
  label?: string;
  rightIcon?: ReactNode;
}

const Input = ({
  name,
  value = '',
  type = 'text',
  width = '100%',
  height = 'auto',
  label,
  placeholder,
  onChange,
  rightIcon,
  ...restProps
}: InputProps) => {
  return (
    <Flex direction="column" gap={8} width={addPX(width)}>
      {!!label && (
        <Text variant="p4" color={color.gray400}>
          {label}
        </Text>
      )}
      <InputWrapper height={addPX(height)} htmlFor={name}>
        <StyledInput
          name={name}
          type={type}
          height={addPX(height)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-placeholder={placeholder}
          {...restProps}
        />
        {!!rightIcon && rightIcon}
      </InputWrapper>
    </Flex>
  );
};

const InputWrapper = styled.label<{ height: string }>`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: text;
  border: 1px solid ${color.gray500};
  padding: 14px 20px;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  flex: 1;
  ${font.p2};

  &::placeholder {
    ${font.p2};
    color: ${color.gray300};
  }
`;

export default Input;
