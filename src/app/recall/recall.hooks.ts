import { useState, useMemo } from 'react';
import { RecallRequest, RecallStatus } from '@/types/recall/client';
import { useRecallRequestsQuery } from '@/services/recall/queries';
import {
  useApproveRecallMutation,
  useRejectRecallMutation,
} from '@/services/recall/mutations';

export const useRecallManagement = () => {
  const [filters, setFilters] = useState({
    status: '' as RecallStatus | '',
    page: 1,
    size: 10,
    sort: 'fastest',
  });

  const [modals, setModals] = useState({
    isApproveModalOpen: false,
    isRejectModalOpen: false,
    selectedItem: null as RecallRequest | null,
  });

  const apiParams = useMemo(() => {
    const params: import('@/types/recall/remote').GetRecallRequestsParams = {
      page: filters.page,
      size: filters.size,
    };

    if (filters.status) {
      params.status = filters.status;
    }

    if (filters.sort) {
      params.sort = filters.sort === 'fastest' ? 'LATEST' : 'OLDEST';
    }

    return params;
  }, [filters.status, filters.page, filters.size, filters.sort]);

  const {
    data: recallData,
    isLoading,
    error,
  } = useRecallRequestsQuery(apiParams);
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
