import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import RecallListItem from '../RecallListItem/RecallListItem';
import RejectModal from '../RejectModal/RejectModal';
import ApproveModal from '../ApproveModal/ApproveModal';
import { RecallRequest, RecallRequestItem } from '@/types/recall/client';

const transformToRecallRequestItem = (
  request: RecallRequest
): RecallRequestItem => ({
  id: request.requestId,
  name: request.itemName,
  requestMessage: request.requestMessage,
  requesterName: request.requesterName,
  requestedAt: request.requestedAt,
  recallStatus: request.status,
  imageUrl: request.imageUrl,
});

interface RecallRequestListProps {
  requests: RecallRequest[];
  isLoading: boolean;
  modals: {
    isApproveModalOpen: boolean;
    isRejectModalOpen: boolean;
    selectedItem: RecallRequest | null;
    handleApprove: (request: RecallRequest) => void;
    handleReject: (request: RecallRequest) => void;
    handleCloseModals: () => void;
  };
  actions: {
    handleApproveConfirm: (itemId: number) => Promise<void>;
    handleRejectConfirm: (itemId: number) => Promise<void>;
  };
}

const RecallRequestList = ({
  requests,
  isLoading,
  modals,
  actions,
}: RecallRequestListProps) => {
  const handleApprove = (id: number) => {
    const request = requests.find((req) => req.requestId === id);
    if (request) {
      modals.handleApprove(request);
    }
  };

  const handleReject = (id: number) => {
    const request = requests.find((req) => req.requestId === id);
    if (request) {
      modals.handleReject(request);
    }
  };

  const selectedItemForProductList = modals?.selectedItem
    ? transformToRecallRequestItem(modals.selectedItem)
    : null;

  if (isLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        width="100%"
        style={{ padding: '40px 0' }}
      >
        <Text color="gray500">회수 요청 목록을 불러오는 중...</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column" gap={20} width="100%">
        {requests.map((request) => {
          const productItem = transformToRecallRequestItem(request);
          return (
            <RecallListItem
              key={`recall-${request.requestId}`}
              item={productItem}
              isRejectModalOpen={
                modals.isRejectModalOpen &&
                modals.selectedItem?.requestId === request.requestId
              }
              onApprove={handleApprove}
              onReject={handleReject}
            />
          );
        })}

        {requests.length === 0 && (
          <Flex
            justify="center"
            align="center"
            width="100%"
            style={{ padding: '40px 0' }}
          >
            <Text color="gray500">회수 요청이 없습니다.</Text>
          </Flex>
        )}
      </Flex>

      <RejectModal
        isOpen={modals.isRejectModalOpen}
        item={selectedItemForProductList}
        onClose={modals.handleCloseModals}
        onConfirm={actions.handleRejectConfirm}
      />

      <ApproveModal
        isOpen={modals.isApproveModalOpen}
        item={selectedItemForProductList}
        onClose={modals.handleCloseModals}
        onConfirm={actions.handleApproveConfirm}
      />
    </>
  );
};

export default RecallRequestList;
