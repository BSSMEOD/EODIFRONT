import { useState } from 'react';

interface Filters {
  search: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  placeId: string;
}

export const useForm = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    startDate: null,
    endDate: null,
    placeId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDropdownChange = (value: string | number[], name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: start,
      endDate: end,
    }));
  };

  return { filters, handleInputChange, handleDropdownChange, handleDateChange };
};
