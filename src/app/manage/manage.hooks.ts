import { useState } from 'react';
import { formatDateDash } from '@utils/formatDate';
import { Category, Status } from '@/types/item/client';

export interface Filters {
  search: string;
  category: Category;
  startDate: Date | null;
  endDate: Date | null;
  placeIds: string[];
  status: Status[];
}

export const useForm = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    startDate: null,
    endDate: null,
    placeIds: [],
    status: ['LOST', 'DISCARDED', 'TO_BE_DISCARDED'],
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
    categories: filters.category,
    placeIds: filters.placeIds.map((id) => parseInt(id)),
    foundAtFrom: filters.startDate
      ? formatDateDash(filters.startDate)
      : undefined,
    foundAtTo: filters.endDate ? formatDateDash(filters.endDate) : undefined,
    status: filters.status,
  });

  return {
    filters,
    handleInputChange,
    handleDropdownChange,
    handleDateChange,
    buildItemListParams,
  };
};
