'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import type { DatePickerProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledDateSelector } from './DateSelector.styles';

registerLocale('ko', ko);

type DateSelectorProps = DatePickerProps;

const DateSelector = (props: DateSelectorProps) => {
  return (
    <StyledDateSelector>
      <DatePicker {...props} locale="ko" />
    </StyledDateSelector>
  );
};

export default DateSelector;
