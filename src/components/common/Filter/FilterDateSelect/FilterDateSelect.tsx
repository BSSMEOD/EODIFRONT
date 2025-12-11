'use client';

import { useState, useMemo } from 'react';
import { format, isSameDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from '@components/common/Filter/FilterDateSelect/FilterDateCustomInput/FilterDateCustomInput';
import DateSelector from '@components/common/DateSelector/DateSelector';

interface FilterDateSelectProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  placeholder?: string;
}

const FilterDateSelect = ({
  startDate,
  endDate,
  onChange,
  placeholder = '날짜',
}: FilterDateSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [setHoveredDate] = useState<Date | null>(null);
  const displayText = useMemo(() => {
    if (!startDate) return placeholder;
    if (!endDate) return format(startDate, 'yyyy.MM.dd');
    return `${format(startDate, 'yyyy.MM.dd')} ~ ${format(endDate, 'yyyy.MM.dd')}`;
  }, [startDate, endDate, placeholder]);
  const renderDayContents = (day: number, date: Date) => {
    let className = 'day-text';
    if (startDate && !endDate && date && isSameDay(date, startDate)) {
      className += ' selecting-start';
    }

    return <span className={className}>{day}</span>;
  };

  return (
    <DateSelector
      width="auto"
      locale="ko"
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      selectsRange
      customInput={
        <CustomInput
          text={displayText}
          hasValue={!!startDate}
          isOpen={isOpen}
        />
      }
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
      shouldCloseOnSelect={false}
      dateFormat="yyyy.MM.dd"
      popperPlacement="bottom-start"
      renderDayContents={renderDayContents}
    />
  );
};

export default FilterDateSelect;
