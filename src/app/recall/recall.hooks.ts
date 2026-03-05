import { useState, useMemo, useEffect } from 'react';
import { RecallRequest, RecallStatus } from '@/types/recall/client';
import { useRecallRequestsQuery } from '@/services/recall/queries';
import {
  useApproveRecallMutation,
  useRejectRecallMutation,
} from '@/services/recall/mutations';

interface RecallFilters {
  status: RecallStatus | '';
  page: number;
  size: number;
  sort: 'LATEST' | 'OLDEST';
  itemId?: number;
}

export const useRecallManagement = (itemId: number | undefined) => {
  const [filters, setFilters] = useState<RecallFilters>({
    status: '',
    page: 1,
    size: 10,
    sort: 'LATEST',
    itemId: itemId,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      itemId,
    }));
  }, [itemId]);

  const [modals, setModals] = useState({
    isApproveModalOpen: false,
    isRejectModalOpen: false,
    selectedItem: null as RecallRequest | null,
  });

  const {
    data: recallData,
    isLoading,
    error,
  } = useRecallRequestsQuery(filters);
  const approveMutation = useApproveRecallMutation();
  const rejectMutation = useRejectRecallMutation();

  const sortedRequests = recallData?.requests || [];

  const handleStatusChange = (status: RecallStatus | '') => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleApprove = (request: RecallRequest) => {
    setModals({
      isApproveModalOpen: true,
      isRejectModalOpen: false,
      selectedItem: request,
    });
  };

  const handleReject = (request: RecallRequest) => {
    setModals({
      isApproveModalOpen: false,
      isRejectModalOpen: true,
      selectedItem: request,
    });
  };

  const handleCloseModals = () => {
    setModals({
      isApproveModalOpen: false,
      isRejectModalOpen: false,
      selectedItem: null,
    });
  };

  const handleApproveConfirm = async (requestId: number) => {
    try {
      await approveMutation.mutateAsync(requestId);
    } finally {
      handleCloseModals();
    }
  };

  const handleRejectConfirm = async (requestId: number) => {
    try {
      await rejectMutation.mutateAsync(requestId);
    } finally {
      handleCloseModals();
    }
  };

  const sortOptions = [
    { label: '최신순', value: 'fastest' },
    { label: '오래된순', value: 'slowest' },
  ];

  return {
    filters: {
      status: filters.status,
      page: filters.page,
      sort: filters.sort,
      itemId: filters.itemId,
      handleStatusChange,
      handlePageChange,
      handleDropdownChange,
    },

    options: {
      sortOptions,
    },

    modals: {
      isApproveModalOpen: modals.isApproveModalOpen,
      isRejectModalOpen: modals.isRejectModalOpen,
      selectedItem: modals.selectedItem,
      handleApprove,
      handleReject,
      handleCloseModals,
    },

    data: {
      requests: sortedRequests,
      isLoading,
      error,
      totalPages: Math.ceil((recallData?.total || 0) / filters.size),
      currentPage: filters.page,
      total: recallData?.total || 0,
    },

    actions: {
      handleApproveConfirm,
      handleRejectConfirm,
      isApproving: approveMutation.isPending,
      isRejecting: rejectMutation.isPending,
    },
  };
};
