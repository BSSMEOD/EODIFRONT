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
import { toast } from 'react-toastify';
import { isDateInRange } from '@/utils/dateUtils';

interface DisposalItem extends Item {
  daysToDisposal: number;
}

export const useAdminDisposal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    disposalDate: '',
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
      status: ['TO_BE_DISCARDED'],
      page: currentPage,
      size: 20,
    };

    if (filters.disposalDate) {
      params.sort = filters.disposalDate === 'fastest' ? 'LATEST' : 'OLDEST';
    }

    return params;
  }, [filters, placeListData, currentPage]);

  const {
    data: disposalItemsData,
    isLoading,
    error,
  } = useAdminDisposalItemsQuery(buildApiParams());

  const filteredItems = useMemo(() => {
    const items = disposalItemsData?.content || [];

    return items;
  }, [disposalItemsData]);

  const disposalItemsWithDays = useMemo(
    () =>
      filteredItems.map((item) => ({
        ...item,
        daysToDisposal: calculateRemainDays(item.foundAt, item.disposalDate),
      })),
    [filteredItems, calculateRemainDays]
  );

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

  const handleRemoveFilter = (name: string) => {
    if (name === 'categories' || name === 'locations') {
      setFilters((prev) => ({
        ...prev,
        [name]: [],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: '' }));
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
      const reasonResponse = await postDisposalReasonMutation.mutateAsync({
        itemId: id,
        req: { reason, days: extensionDays },
      });

      await patchItemDiscardedMutation.mutateAsync({
        itemId: id,
        req: { reasonId: reasonResponse.reasonId },
      });

      // 모든 관련 쿼리를 무효화하여 최신 데이터로 다시 가져오기
      await queryClient.invalidateQueries({
        queryKey: ['admin-disposal', 'items'],
      });

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
      filters,
      handleDropdownChange,
      handleMultiSelectChange,
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
      disposalItems: disposalItemsWithDays,
      isLoading,
      error,
      currentPage,
      totalPages: disposalItemsData?.totalPages || 1,
      handlePageChange,
    },
  };
};
