import styled from '@emotion/styled';
import Flex from '@ui/Flex/Flex';
import font from '@styles/font';
import color from '@styles/color';
import { addPX } from '@utils/addPX';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { CSSProperties, InputHTMLAttributes } from 'react';
import { IconCalender } from '@package/icon/src/IconCalender';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  label?: string;
  readonly?: boolean;
  onChange: (value: string, name: string) => void;
  value?: string;
}

const Input = ({
  name,
  value = '',
  type = 'text',
  width,
  height,
  label,
  placeholder,
  onChange,
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

    onChange(updateValue, name);
  };

  return (
    <Flex direction="column" gap={8} width={addPX(width)}>
      {!!label && <Label>{label}</Label>}
      {type === 'date' ? (
        <DatePicker
          selected={new Date(value)}
          onChange={handleChange}
          dateFormat="yyyy. MM. dd."
          dateFormatCalendar="MM월 yyyy"
          locale={ko}
          icon={<IconCalender />}
        />
      ) : (
        <StyledInput
          type={type}
          height={addPX(height)}
          placeholder={placeholder}
          data-placeholder={placeholder}
          {...restProps}
        />
      )}
    </Flex>
  );
};

const StyledInput = styled.input`
  border: 1px solid ${color.gray500};
  padding: 13px 20px;
  border-radius: 8px;

  &::placeholder {
    ${font.p3};
    color: ${color.gray300};
  }
`;

const Label = styled.span`
  ${font.p4};
  color: ${color.gray400};
`;

export default Input;
