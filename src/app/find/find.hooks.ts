import { useState, useEffect, useCallback } from 'react';
import { useItemListQuery, usePlaceListQuery } from '@services/item/queries';
import { formatDateDash } from '@utils/formatDate';
import { GetItemListParams } from '@/types/item/params';

interface Filters {
  query: string;
  category: string[];
  startDate: Date | null;
  endDate: Date | null;
  location: string[];
}

export const useFindPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [filters, setFilters] = useState<Filters>({
    query: '',
    category: [],
    startDate: null,
    endDate: null,
    location: [],
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
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: start,
      endDate: end,
    }));
  };

  const handleRemoveFilter = (name: string, valueToRemove?: string) => {
    if (name === 'category' || name === 'location') {
      setFilters((prev) => ({
        ...prev,
        [name]: valueToRemove
          ? (prev[name] as string[]).filter((v) => v !== valueToRemove)
          : [],
      }));
    } else if (name === 'query') {
      setFilters((prev) => ({
        ...prev,
        query: '',
      }));
    } else if (name === 'startDate') {
      setFilters((prev) => ({
        ...prev,
        startDate: null,
      }));
    } else if (name === 'endDate') {
      setFilters((prev) => ({
        ...prev,
        endDate: null,
      }));
    } else if (name === 'date') {
      setFilters((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
      }));
    }
  };

  const buildApiParams = useCallback(
    (filters: Filters) => {
      const params: GetItemListParams = {
        page: currentPage,
        size: itemsPerPage,
        status: ['LOST'],
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
    handleSearchChange,
    handleMultiSelectFilterChange,
    handleDateChange,
    handleRemoveFilter,
    itemListData,
    locationOptions,
    isLoading,
    error,
  };
};
