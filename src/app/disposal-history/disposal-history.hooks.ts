import { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { CATEGORY } from '@/constants/item/constant';
import { usePlaceListQuery } from '@/services/item/queries';
import { useDisposalHistoryQuery } from '@/services/disposal-history/queries';
import { GetItemListParams } from '@/types/item/params';

export const useDisposalHistory = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    disposalDate: '',
    categories: [] as string[],
    locations: [] as string[],
    date: '',
  });

  const { data: placeListData } = usePlaceListQuery();

  const buildApiParams = useCallback((): GetItemListParams => {
    const params: GetItemListParams = {
      status: 'DISCARDED',
      page: currentPage,
      size: 10,
    };

    if (filters.disposalDate) {
      params.sort = filters.disposalDate === 'fastest' ? 'LATEST' : 'OLDEST';
    }

    if (filters.categories.length > 0) {
      params.categories = filters.categories;
    }

    if (filters.locations.length > 0 && placeListData) {
      const selectedPlaceIds = placeListData
        .filter((place) => filters.locations.includes(place.name))
        .map((place) => place.id);

      if (selectedPlaceIds.length > 0) {
        params.placeIds = selectedPlaceIds;
      }
    }

    return params;
  }, [filters, placeListData, currentPage]);

  const {
    data: disposalHistoryData,
    isLoading,
    error,
  } = useDisposalHistoryQuery(buildApiParams());

  // disposalDate 기준 날짜 필터링
  const filteredItems = useMemo(() => {
    let items = disposalHistoryData?.content || [];

    if (startDate && endDate) {
      items = items.filter((item) => {
        if (!item.disposalDate) return false;
        const disposalDate = new Date(item.disposalDate);
        const disposalDateOnly = new Date(
          disposalDate.getFullYear(),
          disposalDate.getMonth(),
          disposalDate.getDate()
        );
        const startDateOnly = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        const endDateOnly = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        );

        return (
          disposalDateOnly >= startDateOnly && disposalDateOnly <= endDateOnly
        );
      });
    }

    return items;
  }, [disposalHistoryData, startDate, endDate]);

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleMultiSelectChange = (values: string[], name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: values,
    }));
    setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const handleRemoveFilter = (name: string) => {
    if (name === 'categories' || name === 'locations') {
      setFilters((prev) => ({
        ...prev,
        [name]: [],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const disposalDateOptions = [
    { label: '최신순', value: 'fastest' },
    { label: '오래된순', value: 'slowest' },
  ];

  const categoryOptions = CATEGORY.map((category) => ({
    label: category,
    value: category,
  }));

  const locationOptions = placeListData
    ? placeListData.map((place) => ({
        label: place.name,
        value: place.name,
      }))
    : [];

  const getLocationLabel = (value: string) => {
    const option = locationOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getCategoryLabel = (value: string) => {
    const option = categoryOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return {
    filters: {
      startDate,
      endDate,
      filters,
      handleDropdownChange,
      handleMultiSelectChange,
      handleDateChange,
      handleRemoveFilter,
    },
    options: {
      disposalDateOptions,
      categoryOptions,
      locationOptions,
    },
    utils: {
      getCategoryLabel,
      getLocationLabel,
    },
    data: {
      disposalHistoryItems: filteredItems,
      isLoading,
      error,
      currentPage,
      totalPages: disposalHistoryData?.totalPages || 1,
      handlePageChange,
    },
  };
};
