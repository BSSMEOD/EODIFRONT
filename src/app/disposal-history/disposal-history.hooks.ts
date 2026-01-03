import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { CATEGORY } from '@/constants/item/constant';
import { usePlaceListQuery } from '@/services/item/queries';
import { useDisposalHistoryQuery } from '@/services/disposal-history/queries';
import { formatDateDash } from '@/utils/formatDate';
import { GetItemListParams } from '@/types/item/params';

export const useDisposalHistory = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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
      page: 1,
      size: 100,
    };

    if (filters.disposalDate) {
      params.sort = filters.disposalDate === 'fastest' ? 'LATEST' : 'OLDEST';
    }

    if (filters.categories.length > 0) {
      params.categories = filters.categories;
    }

    if (startDate) {
      params.foundAtFrom = formatDateDash(startDate);
    }

    if (endDate) {
      params.foundAtTo = formatDateDash(endDate);
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
  }, [filters, startDate, endDate, placeListData]);

  const {
    data: disposalHistoryData,
    isLoading,
    error,
  } = useDisposalHistoryQuery(buildApiParams());

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (values: string[], name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: values,
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

  const handleRemoveFilter = (name: string, valueToRemove?: string) => {
    if (name === 'categories' || name === 'locations') {
      setFilters((prev) => ({
        ...prev,
        [name]: valueToRemove
          ? (prev[name] as string[]).filter((v) => v !== valueToRemove)
          : [],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
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
    ? [
        { label: '전체', value: '' },
        ...placeListData.map((place) => ({
          label: place.name,
          value: place.name,
        })),
      ]
    : [{ label: '전체', value: '' }];

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
    data: {
      disposalHistoryItems: disposalHistoryData?.content || [],
      isLoading,
      error,
    },
  };
};
