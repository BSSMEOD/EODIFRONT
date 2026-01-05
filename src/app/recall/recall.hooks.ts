import React, { useState, useMemo } from 'react';
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

  // API 파라미터 메모이제이션 - 쿼리 키 안정화
  const apiParams = useMemo(() => {
    const params: import('@/types/recall/remote').GetRecallRequestsParams & {
      sort?: string;
    } = {
      page: filters.page,
      size: filters.size,
    };

    // 상태 필터 ("전체"인 경우 빈 문자열이므로 제외)
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

  // 프론트엔드 강제 정렬 (백엔드 미작동 대비)
  const sortedRequests = useMemo(() => {
    const originalRequests = recallData?.requests || [];
    if (!filters.sort) return originalRequests;

    const sorted = [...originalRequests].sort((a, b) => {
      const timeA = new Date(a.requestedAt).getTime();
      const timeB = new Date(b.requestedAt).getTime();

      // 날짜 파싱 실패 시 처리
      if (isNaN(timeA) || isNaN(timeB)) {
        console.warn('⚠️ 날짜 파싱 실패:', {
          a: a.requestedAt,
          b: b.requestedAt,
        });
        return 0;
      }

      if (filters.sort === 'fastest') {
        // 최신순 (LATEST) - 날짜 내림차순
        return timeB - timeA;
      } else {
        // 오래된순 (OLDEST) - 날짜 오름차순
        return timeA - timeB;
      }
    });

    return sorted;
  }, [recallData?.requests, filters.sort]);

  // 필터 핸들러
  const handleStatusChange = (status: RecallStatus | '') => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  // 모달 핸들러
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

  // 승인/반려 액션
  const handleApproveConfirm = async (itemId: number) => {
    try {
      await approveMutation.mutateAsync({
        itemId,
        req: { result: 'APPROVED' },
      });
      handleCloseModals();
    } catch (error) {
      // 에러는 mutation에서 처리됨
    }
  };

  const handleRejectConfirm = async (itemId: number, reason: string) => {
    try {
      await rejectMutation.mutateAsync({
        itemId,
        req: { result: 'REJECTED' },
      });
      handleCloseModals();
    } catch (error) {
      // 에러는 mutation에서 처리됨
    }
  };

  // 옵션 정의
  const sortOptions = [
    { label: '최신순', value: 'fastest' },
    { label: '오래된순', value: 'slowest' },
  ];

  return {
    // 필터 상태
    filters: {
      status: filters.status,
      page: filters.page,
      sort: filters.sort,
      handleStatusChange,
      handlePageChange,
      handleDropdownChange,
    },
    // 옵션
    options: {
      sortOptions,
    },
    // 모달 상태
    modals: {
      isApproveModalOpen: modals.isApproveModalOpen,
      isRejectModalOpen: modals.isRejectModalOpen,
      selectedItem: modals.selectedItem,
      handleApprove,
      handleReject,
      handleCloseModals,
    },
    // 데이터 - 프론트엔드 정렬 결과 사용
    data: {
      requests: sortedRequests,
      isLoading,
      error,
      totalPages: Math.ceil((recallData?.total || 0) / filters.size),
      currentPage: filters.page,
      total: recallData?.total || 0,
    },
    // 액션
    actions: {
      handleApproveConfirm,
      handleRejectConfirm,
      isApproving: approveMutation.isPending,
      isRejecting: rejectMutation.isPending,
    },
  };
};
