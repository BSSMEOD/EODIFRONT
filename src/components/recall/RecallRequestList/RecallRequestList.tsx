import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import RejectModal from '../RejectModal/RejectModal';
import ApproveModal from '../ApproveModal/ApproveModal';
import { Item } from '@/types/item/client';
import { toast } from 'react-toastify';

const mockRecallRequests = [
  {
    id: 1,
    name: '제 우산입니다.',
    requestMessage: '안녕하세요 제 물건이에요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
    category: '기타' as const,
    reporterName: '홍길동',
  },
  {
    id: 2,
    name: '제 버즈입니다.',
    requestMessage: '안녕하세요 제 물건이에요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
    category: '전자기기' as const,
    reporterName: '김철수',
  },
  {
    id: 3,
    name: '제 안경입니다.',
    requestMessage: '안녕하세요 제 물건이에요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
    category: '안경' as const,
    reporterName: '이영희',
  },
  {
    id: 4,
    name: '제 우산입니다.',
    requestMessage: '안녕하세요 제 물건이에요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
    category: '기타' as const,
    reporterName: '박민수',
  },
  {
    id: 5,
    name: '제 버즈입니다.',
    requestMessage: '안녕하세요 제 물건이에요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
    category: '전자기기' as const,
    reporterName: '최지원',
  },
];

const RecallRequestList = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleApprove = (id: number) => {
    const item = mockRecallRequests.find((request) => request.id === id);
    if (item) {
      setSelectedItem(item);
      setIsApproveModalOpen(true);
    }
  };

  const handleApproveConfirm = (id: number) => {
    // TODO: API 통합 후 실제 승인 로직 구현 필요
    toast.success('회수 요청이 승인되었습니다.');
    setIsApproveModalOpen(false);
    setSelectedItem(null);
  };

  const handleReject = (id: number) => {
    const item = mockRecallRequests.find((request) => request.id === id);
    if (item) {
      setSelectedItem(item);
      setIsRejectModalOpen(true);
    }
  };

  const handleRejectConfirm = (id: number, reason: string) => {
    // TODO: API 통합 후 실제 반려 로직 구현 필요 (id, reason 활용)
    toast.success('회수 요청이 반려되었습니다.');
    setIsRejectModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Flex direction="column" gap={20} width="100%">
        {mockRecallRequests.map((request) => (
          <ProductListItem
            key={`recall-${request.id}`}
            product={request}
            size="big"
            showStatus={false}
            recallMode={true}
            isRejectModalOpen={
              isRejectModalOpen && selectedItem?.id === request.id
            }
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </Flex>

      <RejectModal
        isOpen={isRejectModalOpen}
        item={selectedItem}
        onClose={handleCloseRejectModal}
        onConfirm={handleRejectConfirm}
      />

      <ApproveModal
        isOpen={isApproveModalOpen}
        item={selectedItem}
        onClose={handleCloseApproveModal}
        onConfirm={handleApproveConfirm}
      />
    </>
  );
};

export default RecallRequestList;
