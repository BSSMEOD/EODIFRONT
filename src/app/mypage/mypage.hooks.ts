import { useState } from 'react';
import type { MyRecallItem } from '@/types/mypage/client';

const INITIAL_RECALL_ITEMS: MyRecallItem[] = [
  {
    requestId: 1,
    itemId: 101,
    itemName: '긱시크 안경',
    requestedAt: '2025-08-05',
    imageUrl: '/icon.svg',
    status: 'REJECTED',
  },
  {
    requestId: 2,
    itemId: 102,
    itemName: '긱시크 안경',
    requestedAt: '2025-08-05',
    imageUrl: '/icon.svg',
    status: 'APPROVED',
  },
  {
    requestId: 3,
    itemId: 103,
    itemName: '긱시크 안경',
    requestedAt: '2025-08-05',
    imageUrl: '/icon.svg',
    status: 'PENDING',
  },
];

export const useMyPage = () => {
  const [recallItems, setRecallItems] =
    useState<MyRecallItem[]>(INITIAL_RECALL_ITEMS);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  const isCancelModalOpen = selectedRequestId !== null;

  const handleCancelClick = (requestId: number) => {
    setSelectedRequestId(requestId);
  };

  const handleCancelClose = () => {
    setSelectedRequestId(null);
  };

  const handleCancelConfirm = () => {
    if (selectedRequestId === null) return;

    // TODO: Replace with cancel recall request mutation.
    setRecallItems((prevItems) =>
      prevItems.filter((item) => item.requestId !== selectedRequestId)
    );
    setSelectedRequestId(null);
  };

  return {
    recallItems,
    isCancelModalOpen,
    handleCancelClick,
    handleCancelClose,
    handleCancelConfirm,
  };
};
