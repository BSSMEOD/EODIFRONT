import { useState } from 'react';
import Flex from '@components/common/Flex/Flex';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import RejectModal from '../RejectModal/RejectModal';
import { Item } from '@/types/item/client';
import { toast } from 'react-toastify';

const mockRecallRequests = [
  {
    id: 1,
    name: '제 우산입니다.',
    requestMessage: '안녕하세요 제 물건이예요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
  },
  {
    id: 2,
    name: '제 버즈입니다.',
    requestMessage: '안녕하세요 제 물건이예요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
  },
  {
    id: 3,
    name: '제 안경입니다.',
    requestMessage: '안녕하세요 제 물건이예요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
  },
  {
    id: 4,
    name: '제 우산입니다.',
    requestMessage: '안녕하세요 제 물건이예요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
  },
  {
    id: 5,
    name: '제 버즈입니다.',
    requestMessage: '안녕하세요 제 물건이예요 돌려주세요',
    imageUrl: '',
    foundAt: '',
    foundPlace: '',
    foundPlaceDetail: '',
    status: 'LOST' as const,
  },
];

const RecallRequestList = () => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleApprove = (id: number) => {
    if (window.confirm('회수 요청을 승인하시겠습니까?')) {
      console.log('Approve request:', id);
      // 승인 로직 구현
      toast.success('회수 요청이 승인되었습니다.');
    }
  };

  const handleReject = (id: number) => {
    const item = mockRecallRequests.find((request) => request.id === id);
    if (item) {
      setSelectedItem(item);
      setIsRejectModalOpen(true);
    }
  };

  const handleRejectConfirm = (id: number, reason: string) => {
    console.log('Reject request:', id, 'Reason:', reason);
    // 반려 로직 구현
    toast.success('회수 요청이 반려되었습니다.');
    setIsRejectModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
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
    </>
  );
};

export default RecallRequestList;
