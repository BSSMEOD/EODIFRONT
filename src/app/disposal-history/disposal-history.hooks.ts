import { useState } from 'react';
import { format } from 'date-fns';
import { CATEGORY } from '@/constants/item/constant';

export const useDisposalHistory = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    disposalDate: '',
    category: '',
    location: '',
    date: '',
  });

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const dateStr = `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'yyyy.MM.dd')}`;
      setFilters((prev) => ({ ...prev, date: dateStr }));
    } else {
      setFilters((prev) => ({ ...prev, date: '' }));
    }
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const disposalDateOptions = [
    { label: '빠른순', value: 'fastest' },
    { label: '느린순', value: 'slowest' },
  ];

  const categoryOptions = CATEGORY.map((category) => ({
    label: category,
    value: category,
  }));

  const locationOptions = [
    { label: '전체', value: '' },
    { label: '운동장', value: 'playground' },
    { label: '도서관', value: 'library' },
    { label: 'SRC', value: 'src' },
  ];

  return {
    filters: {
      startDate,
      endDate,
      filters,
      handleDropdownChange,
      handleDateChange,
      handleRemoveFilter,
    },
    options: {
      disposalDateOptions,
      categoryOptions,
      locationOptions,
    },
  };
};
