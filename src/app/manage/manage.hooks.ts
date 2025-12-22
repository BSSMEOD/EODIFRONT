import { useState } from 'react';
import { formatDateDash } from '@utils/formatDate';

export interface Filters {
  search: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  placeIds: string[];
}

export const useForm = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    startDate: null,
    endDate: null,
    placeIds: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDropdownChange = (value: string | string[], name: string) => {
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

  const buildItemListParams = (filters: Filters) => ({
    query: filters.search,
    category: filters.category,
    placeIds: filters.placeIds.map((id) => parseInt(id)),
    foundAtFrom: filters.startDate
      ? formatDateDash(filters.startDate)
      : undefined,
    foundAtTo: filters.endDate ? formatDateDash(filters.endDate) : undefined,
  });

  return {
    filters,
    handleInputChange,
    handleDropdownChange,
    handleDateChange,
    buildItemListParams,
  };
};
