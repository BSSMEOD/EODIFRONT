'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import type { DatePickerProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledDateSelector } from './DateSelector.styles';

registerLocale('ko', ko);

type DateSelectorProps = DatePickerProps & {
  width?: string | number;
  noShadow?: boolean;
};

const DateSelector = ({
  width = '100%',
  noShadow = false,
  ...restProps
}: DateSelectorProps) => {
  return (
    <StyledDateSelector width={width} noShadow={noShadow}>
      <DatePicker {...restProps} locale="ko" />
    </StyledDateSelector>
  );
};

export default DateSelector;
