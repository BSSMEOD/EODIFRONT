import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import IconLink from '@/icons/src/IconLink';
import IconConvert from '@/icons/src/IconConvert';
import { useOverlay } from '@toss/use-overlay';
import DisposalReasonModal from '@components/disposal/DisposalReasonModal/DisposalReasonModal';
import type { Item } from '@/types/item/client';
import { useRouter } from 'next/navigation';
import { useDisposalItemsQuery } from '@/services/disposal/queries';
import { useSubmitDisposalReasonMutation } from '@/services/disposal/mutations';
import { useCalculateRemainDays } from '@/hooks/disposal/useCalculateRemainDays';
import { toast } from 'react-toastify';
import Text from '@components/common/Text/Text';
import type { GetItemListParams } from '@/types/item/params';
import Pagination from '@components/common/Pagination/Pagination';
import { useMemo, useState } from 'react';

interface DisposalTableProps {
  filters?: Omit<GetItemListParams, 'status'>;
}

const DisposalTable = ({ filters }: DisposalTableProps) => {
  const overlay = useOverlay();
  const router = useRouter();
  const { calculateRemainDays } = useCalculateRemainDays();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { data } = useDisposalItemsQuery({
    status: 'TO_BE_DISCARDED',
    page: 1,
    size: 100,
    ...filters,
  });

  const { mutate: submitReason } = useSubmitDisposalReasonMutation();

  const handleItemClick = (itemId: number) => {
    router.push(`/find/detail/${itemId}`);
  };

  const handleSubmitReason = (itemId: number, reason: string, days: number) => {
    submitReason(
      { itemId, req: { reason, days } },
      {
        onSuccess: () => {
          toast.success('폐기 보류 사유가 제출되었습니다.');
        },
        onError: () => {
          toast.error('폐기 보류 사유 제출에 실패했습니다.');
        },
      }
    );
  };

  const handleConvert = (item: Item) => {
    const remainDays = calculateRemainDays(item.foundAt);
    overlay.open(({ isOpen, close }) => (
      <DisposalReasonModal
        isOpen={isOpen}
        itemId={item.id}
        itemName={item.name}
        remainDays={remainDays}
        onClose={close}
        onSubmit={handleSubmitReason}
      />
    ));
  };

  const disposalData = useMemo(() => data?.content || [], [data?.content]);

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return disposalData.slice(startIndex, endIndex);
  }, [disposalData, currentPage]);

  const totalPages = Math.ceil(disposalData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <StyledDisposalTable>
      <TableWrapper>
        <Flex>
          <Th
            width="25%"
            height={56}
            borderTopLeftRadius={10}
            textColor={color.white}
          >
            폐기 날짜
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            물품명
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            폐기 여부
          </Th>
          <Th
            width="25%"
            height={56}
            borderTopRightRadius={10}
            textColor={color.white}
          >
            폐기 처리 상태
          </Th>
        </Flex>
        {paginatedData.length === 0 ? (
          <Text>폐기 예정 물품이 없습니다.</Text>
        ) : (
          paginatedData.map((item) => {
            const remainDays = calculateRemainDays(
              item.foundAt,
              item.disposalDate
            );
            return (
              <Flex key={item.id}>
                <Td width="25%" height={56}>
                  D-{remainDays}
                </Td>
                <Td width="25%" height={56}>
                  <ItemName>
                    {item.name}
                    <IconLinkButton
                      type="button"
                      aria-label={`${item.name} 상세 정보 보기`}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <IconLink
                        width={24}
                        height={24}
                        color={color.secondary}
                      />
                    </IconLinkButton>
                  </ItemName>
                </Td>
                <Td width="25%" height={56}>
                  <StatusText $status="expected">예정</StatusText>
                </Td>
                <Td width="25%" height={56}>
                  <ConvertButton
                    type="button"
                    aria-label={`${item.name} 보류 처리`}
                    onClick={() => handleConvert(item)}
                  >
                    <IconConvert width={24} height={24} color={color.black} />
                  </ConvertButton>
                </Td>
              </Flex>
            );
          })
        )}
      </TableWrapper>
      {totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisiblePages={5}
          />
        </PaginationWrapper>
      )}
    </StyledDisposalTable>
  );
};

export default DisposalTable;

const StyledDisposalTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const StatusText = styled.span<{ $status: 'expected' | 'completed' }>`
  ${font.p2}
  color: ${color.black};
`;

const ConvertButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.gray100};
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
