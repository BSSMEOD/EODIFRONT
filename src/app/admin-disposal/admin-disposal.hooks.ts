import { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { Item } from '@/types/item/client';
import { CATEGORY } from '@/constants/item/constant';
import { usePlaceListQuery } from '@/services/item/queries';
import { useAdminDisposalItemsQuery } from '@/services/admin-disposal/queries';
import { useCalculateRemainDays } from '@/hooks/disposal/useCalculateRemainDays';
import {
  usePostDisposalReasonMutation,
  usePatchItemDiscardedMutation,
} from '@/services/admin-disposal/mutations';
import { useQueryClient } from '@tanstack/react-query';
import { GetItemListParams } from '@/types/item/params';
import { GetItemListRes } from '@/types/item/response';
import { toast } from 'react-toastify';

interface DisposalItem extends Item {
  daysToDisposal: number;
}

export const useAdminDisposal = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    disposalDate: '',
    categories: [] as string[],
    locations: [] as string[],
    date: '',
  });

  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DisposalItem | null>(null);

  const queryClient = useQueryClient();
  const { data: placeListData } = usePlaceListQuery();
  const postDisposalReasonMutation = usePostDisposalReasonMutation();
  const patchItemDiscardedMutation = usePatchItemDiscardedMutation();
  const { calculateRemainDays } = useCalculateRemainDays();

  const buildApiParams = useCallback((): GetItemListParams => {
    const params: GetItemListParams = {
      status: 'TO_BE_DISCARDED',
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

  // 물품 목록 조회
  const {
    data: disposalItemsData,
    isLoading,
    error,
  } = useAdminDisposalItemsQuery(buildApiParams());

  // disposalDate 기준 날짜 필터링
  const filteredItems = useMemo(() => {
    let items = disposalItemsData?.content || [];

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
  }, [disposalItemsData, startDate, endDate]);

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

  const handleDisposalHistory = () => {
    window.location.href = '/disposal-history';
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExtension = (id: number) => {
    const item = disposalItemsData?.content.find((item) => item.id === id);
    if (item) {
      setSelectedItem({
        ...item,
        daysToDisposal: calculateRemainDays(item.foundAt, item.disposalDate),
      });
      setIsExtensionModalOpen(true);
    }
  };

  const handleExtensionConfirm = async (
    id: number,
    extensionDays: number,
    reason: string
  ) => {
    try {
      // 캐시 키를 미리 고정 (연장 시작 시점의 파라미터 사용)
      const currentCacheKey = ['admin-disposal', 'items', buildApiParams()];

      const reasonResponse = await postDisposalReasonMutation.mutateAsync({
        itemId: id,
        req: { reason, days: extensionDays },
      });

      const patchResponse = await patchItemDiscardedMutation.mutateAsync({
        itemId: id,
        req: { reasonId: reasonResponse.reasonId },
      });

      queryClient.setQueryData(
        currentCacheKey,
        (oldData: GetItemListRes | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            content: oldData.content.map((item) =>
              item.id === id
                ? {
                    ...item,
                    disposalDate: patchResponse.extendedDisposalDate,
                  }
                : item
            ),
          };
        }
      );

      toast.success('연장 처리가 완료되었습니다.');
      setIsExtensionModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('연장 처리 중 오류가 발생했습니다:', error);
      toast.error('연장 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModals = () => {
    setIsExtensionModalOpen(false);
    setSelectedItem(null);
  };

  const disposalDateOptions = [
    { label: '빠른순', value: 'fastest' },
    { label: '느린순', value: 'slowest' },
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

  // 값을 레이블로 변환하는 헬퍼 함수들
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
      handleDisposalHistory,
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
    modals: {
      isExtensionModalOpen,
      selectedItem,
      handleExtension,
      handleExtensionConfirm,
      handleCloseModals,
    },
    data: {
      disposalItems: filteredItems.map((item) => ({
        ...item,
        daysToDisposal: calculateRemainDays(item.foundAt, item.disposalDate),
      })),
      isLoading,
      error,
      currentPage,
      totalPages: disposalItemsData?.totalPages || 1,
      handlePageChange,
    },
  };
};
