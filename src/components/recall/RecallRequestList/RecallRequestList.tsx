import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import RejectModal from '../RejectModal/RejectModal';
import ApproveModal from '../ApproveModal/ApproveModal';
import { Item } from '@/types/item/client';
import { RecallRequest } from '@/types/recall/client';

const transformToProductListItem = (
  request: RecallRequest
): Item & {
  requestMessage: string;
  requesterName: string;
  requestedAt: string;
  recallStatus: string;
} => ({
  id: request.itemId,
  name: request.itemName,
  requestMessage: request.requestMessage,
  requesterName: request.requesterName,
  requestedAt: request.requestedAt,
  recallStatus: request.status,
  imageUrl: request.imageUrl,
  foundAt: '',
  foundPlace: '',
  foundPlaceDetail: '',
  status: 'LOST' as const,
  category: '기타' as const,
  reporterName: request.requesterName,
});

interface RecallRequestListProps {
  requests: RecallRequest[];
  isLoading: boolean;
  error: Error | null;
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
    handleRejectConfirm: (itemId: number, reason: string) => Promise<void>;
  };
  filters: {
    sort: string;
  };
}

const RecallRequestList = ({
  requests,
  isLoading,
  error,
  modals,
  actions,
  filters,
}: RecallRequestListProps) => {
  const handleApprove = (id: number) => {
    const request = requests.find((req) => req.itemId === id);
    if (request) {
      modals.handleApprove(request);
    }
  };

  const handleReject = (id: number) => {
    const request = requests.find((req) => req.itemId === id);
    if (request) {
      modals.handleReject(request);
    }
  };

  const handleApproveConfirm = (id: number) => {
    actions.handleApproveConfirm(id);
  };

  const handleRejectConfirm = (id: number, reason: string) => {
    actions.handleRejectConfirm(id, reason);
  };

  const selectedItemForProductList = modals?.selectedItem
    ? transformToProductListItem(modals.selectedItem)
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

  if (error) {
    return (
      <Flex
        justify="center"
        align="center"
        width="100%"
        style={{ padding: '40px 0' }}
      >
        <Text color="red">회수 요청 목록을 불러오는데 실패했습니다.</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column" gap={20} width="100%">
        {requests.map((request, index) => {
          const productItem = transformToProductListItem(request);
          return (
            <ProductListItem
              key={`recall-${request.requestId}-${index}-${filters.sort}`}
              product={productItem}
              size="big"
              showStatus={false}
              recallMode={true}
              isRejectModalOpen={
                modals.isRejectModalOpen &&
                modals.selectedItem?.itemId === request.itemId
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
        onConfirm={handleRejectConfirm}
      />

      <ApproveModal
        isOpen={modals.isApproveModalOpen}
        item={selectedItemForProductList}
        onClose={modals.handleCloseModals}
        onConfirm={handleApproveConfirm}
      />
    </>
  );
};

export default RecallRequestList;
