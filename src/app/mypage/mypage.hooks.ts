import { useEffect, useState } from 'react';
import { useMyClaimsQuery } from '@/services/mypage/queries';
import { useCancelMyClaimMutation } from '@/services/mypage/mutations';
import type { MyRecallItem } from '@/types/mypage/client';

const PAGE_SIZE = 10;

export const useMyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaimId, setSelectedClaimId] = useState<number | null>(null);
  const { data, isLoading, error } = useMyClaimsQuery({
    page: currentPage,
    size: PAGE_SIZE,
  });
  const { mutate: cancelMyClaim } = useCancelMyClaimMutation();

  const recallItems: MyRecallItem[] =
    data?.claims.map((claim) => ({
      claimId: claim.claimId,
      itemId: claim.itemId,
      itemName: claim.itemName,
      imageUrl: claim.imageUrl,
      requestedAt: claim.requestedAt,
      status: claim.status,
    })) ?? [];

  const totalPages =
    data && data.size > 0 ? Math.ceil(data.total / data.size) : 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const isCancelModalOpen = selectedClaimId !== null;

  const handleCancelClick = (claimId: number) => {
    setSelectedClaimId(claimId);
  };

  const handleCancelClose = () => {
    setSelectedClaimId(null);
  };

  const handleCancelConfirm = () => {
    if (selectedClaimId === null) return;

    cancelMyClaim(selectedClaimId);
    setSelectedClaimId(null);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    error,
    recallItems,
    isCancelModalOpen,
    handleCancelClick,
    handleCancelClose,
    handleCancelConfirm,
  };
};
