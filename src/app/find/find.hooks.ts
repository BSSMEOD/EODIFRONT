import { useState, useEffect, useCallback } from 'react';
import { useItemListQuery, usePlaceListQuery } from '@services/item/queries';
import { formatDateDash, formatRangeDateDot } from '@utils/formatDate';
import { GetItemListParams } from '@/types/item/params';
import { Category } from '@/types/item/client';

interface Filters {
  query: string;
  category: Category | '';
  startDate: Date | null;
  endDate: Date | null;
  location: string[];
}

export const useFindPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [filters, setFilters] = useState<Filters>({
    query: '',
    category: '',
    startDate: null,
    endDate: null,
    location: [],
  });

  const [displayFilters, setDisplayFilters] = useState<Record<string, string>>({
    category: '',
    date: '',
    location: '',
  });

  const { data: placeListData } = usePlaceListQuery();

  const locationOptions = placeListData?.map((place) => place.name) || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.category,
    filters.startDate,
    filters.endDate,
    filters.location,
    filters.query,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleMultiSelectFilterChange = (values: string[], name: string) => {
    setFilters((prev) => ({ ...prev, [name]: values }));

    if (values.length > 1) {
      setDisplayFilters((prev) => ({
        ...prev,
        [name]: `${values[0]} 외 ${values.length - 1}개`,
      }));
    } else {
      setDisplayFilters((prev) => ({ ...prev, [name]: values[0] || '' }));
    }
  };

  const handleDropdownChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setDisplayFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: start,
      endDate: end,
    }));
    if (start) {
      setDisplayFilters((prev) => ({
        ...prev,
        date: formatRangeDateDot(start, end),
      }));
    }
  };

  const handleRemoveFilter = (name: string) => {
    if (name === 'category') {
      setFilters((prev) => ({ ...prev, category: '' }));
      setDisplayFilters((prev) => ({ ...prev, category: '' }));
    } else if (name === 'location') {
      setFilters((prev) => ({ ...prev, location: [] }));
      setDisplayFilters((prev) => ({ ...prev, location: '' }));
    } else if (name === 'date') {
      setFilters((prev) => ({ ...prev, startDate: null, endDate: null }));
      setDisplayFilters((prev) => ({ ...prev, date: '' }));
    }
  };

  const buildApiParams = useCallback(
    (filters: Filters) => {
      const params: GetItemListParams = {
        page: currentPage,
        size: itemsPerPage,
        status: ['LOST', 'TO_BE_DISCARDED'],
      };

      if (filters.query) {
        params.query = filters.query;
      }

      if (filters.category.length > 0) {
        params.categories = filters.category;
      }

      if (filters.startDate) {
        params.foundAtFrom = formatDateDash(filters.startDate);
      }

      if (filters.endDate) {
        params.foundAtTo = formatDateDash(filters.endDate);
      }

      if (filters.location.length > 0 && placeListData) {
        const selectedPlaceIds = placeListData
          .filter((place) => filters.location.includes(place.name))
          .map((place) => place.id);

        if (selectedPlaceIds.length > 0) {
          params.placeIds = selectedPlaceIds;
        }
      }

      return params;
    },
    [currentPage, placeListData]
  );

  const {
    data: itemListData,
    isLoading,
    error,
  } = useItemListQuery(buildApiParams(filters));

  return {
    currentPage,
    setCurrentPage,
    filters,
    displayFilters,
    handleSearchChange,
    handleDropdownChange,
    handleMultiSelectFilterChange,
    handleDateChange,
    handleRemoveFilter,
    itemListData,
    locationOptions,
    isLoading,
    error,
  };
};
