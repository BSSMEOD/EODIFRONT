'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import Pagination from '@components/common/Pagination/Pagination';
import BaseModal from '@components/common/Modal/BaseModal';
import { useRequireRole } from '@hooks/useRequireRole';
import RecallHistoryItemCard from '@components/mypage/RecallHistoryItemCard/RecallHistoryItemCard';
import { useMyPage } from './mypage.hooks';

const MyPage = () => {
  useRequireRole('USER');

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    recallItems,
    isCancelModalOpen,
    handleCancelClick,
    handleCancelClose,
    handleCancelConfirm,
  } = useMyPage();

  return (
    <PageContainer>
      <Flex direction="column" gap={16} width="100%">
        <Text variant="H1" color={color.black}>
          회수 요청 내역
        </Text>
        <Flex direction="column" gap={8} width="100%">
          {isLoading ? (
            <EmptyStateText
              variant="p2"
              color={color.gray500}
              textAlign="center"
            >
              회수 요청 내역을 불러오는 중입니다...
            </EmptyStateText>
          ) : recallItems.length > 0 ? (
            recallItems.map((item) => (
              <RecallHistoryItemCard
                key={item.claimId}
                item={item}
                onCancel={handleCancelClick}
              />
            ))
          ) : (
            <EmptyStateText
              variant="p2"
              color={color.gray500}
              textAlign="center"
            >
              회수 요청 내역이 없습니다.
            </EmptyStateText>
          )}
        </Flex>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Flex>
      <BaseModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
        confirmText="확인"
        cancelText="취소"
      >
        <ModalBody direction="column" align="center" justify="center">
          <Text variant="H3" color={color.black} textAlign="center">
            회수 요청을 취소하시겠습니까?
          </Text>
        </ModalBody>
      </BaseModal>
    </PageContainer>
  );
};

export default MyPage;

const PageContainer = styled.div`
  padding-top: 32px;
  width: 100%;
`;

const EmptyStateText = styled(Text)`
  padding: 48px 0;
`;

const ModalBody = styled(Flex)`
  padding: 20px 0;
`;
