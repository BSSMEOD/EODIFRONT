import { useState, useEffect } from 'react';
import { useItemListQuery, usePlaceListQuery } from '@services/item/queries';
import { formatDateDash } from '@utils/formatDate';
import { LOCATION_MAP } from '@/constants/item/constant';
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

  const locationOptions =
    placeListData && placeListData.length > 0
      ? placeListData.map((place) => place.name)
      : Object.keys(LOCATION_MAP);

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
    }
  };

  const buildApiParams = (filters: Filters) => {
    const params: GetItemListParams = {
      page: currentPage,
      size: itemsPerPage,
      status: 'LOST',
    };

    if (filters.query) {
      params.query = filters.query;
    }

    if (filters.category.length > 0) {
      params.category = filters.category[0];
    }

    if (filters.startDate) {
      params.foundAtFrom = formatDateDash(filters.startDate);
    }

    if (filters.endDate) {
      params.foundAtTo = formatDateDash(filters.endDate);
    }

    if (filters.location.length > 0) {
      let selectedPlaceIds: number[] = [];

      if (placeListData && placeListData.length > 0) {
        selectedPlaceIds = placeListData
          .filter((place) => filters.location.includes(place.name))
          .map((place) => place.id);
      } else {
        selectedPlaceIds = filters.location
          .map((loc) => LOCATION_MAP[loc])
          .filter((id) => id !== undefined);
      }

      if (selectedPlaceIds.length > 0) {
        params.placeIds = selectedPlaceIds;
      }
    }

    return params;
  };

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
