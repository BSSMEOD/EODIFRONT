import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import color from '@styles/color';
import IconConvert from '@/icons/src/IconConvert';
import font from '@styles/font';
import IconLink from '@/icons/src/IconLink';
import { useRewardRequestQuery } from '@/services/point/queries';
import { useGiveRewardMutation } from '@/services/point/mutations';
import type { PointItem } from '@/types/point/client';
import { toast } from 'react-toastify';
import { useMemo, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Pagination from '@components/common/Pagination/Pagination';
interface PointTableProps {
  userId?: number;
  date?: string;
  grade?: number;
  class?: number;
}

const PointTable = ({
  userId,
  date,
  grade,
  class: classNum,
}: PointTableProps = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [userId, date, grade, classNum]);

  const { data, isLoading, error } = useRewardRequestQuery();
  const { mutateAsync } = useGiveRewardMutation();

  const pointData = useMemo<PointItem[]>(() => {
    if (!data?.rewards) return [];

    return data.rewards.map((item) => ({
      itemId: item.itemId,
      studentId: item.reporterStudentCode ?? 0,
      itemName: item.itemName,
      studentName: item.reporterName,
      reporter: '',
      status: item.isRewarded ? 'paid' : 'unpaid',
      receivedAt: item.claimedAt ? item.claimedAt.split('T')[0] : '-',
      givenAt: item.isRewarded ? item.claimedAt : null,
    }));
  }, [data]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return pointData.slice(startIndex, endIndex);
  }, [pointData, currentPage]);

  const totalPages = Math.ceil(pointData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleConvert = async (itemId: number, studentId: number) => {
    const key = `${itemId}-${studentId}`;

    if (loadingItems.has(key)) return;

    setLoadingItems((prev) => new Set(prev).add(key));

    try {
      await mutateAsync({ itemId, studentId });
      toast.success('상점이 성공적으로 지급되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reward', 'request'] });
    } catch (error) {
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
          }
        )?.response?.data?.message || '상점 지급에 실패했습니다.';
      toast.error(errorMessage);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  };

  const handleItemClick = (itemId: number) => {
    router.push(`/find/detail/${itemId}`);
  };

  if (isLoading) {
    return (
      <StyledPointTable>
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      </StyledPointTable>
    );
  }

  if (error) {
    return (
      <StyledPointTable>
        <ErrorMessage>데이터를 불러오는데 실패했습니다.</ErrorMessage>
      </StyledPointTable>
    );
  }

  if (pointData.length === 0) {
    return (
      <StyledPointTable>
        <EmptyMessage>데이터가 없습니다.</EmptyMessage>
      </StyledPointTable>
    );
  }

  return (
    <StyledPointTable>
      <TableWrapper>
        <Flex>
          <Th
            width="20%"
            height={56}
            borderTopLeftRadius={10}
            textColor={color.white}
          >
            습득물명
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            학생명
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            수령 날짜
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            상점 상태
          </Th>
          <Th
            width="20%"
            height={56}
            borderTopRightRadius={10}
            textColor={color.white}
          >
            수정
          </Th>
        </Flex>
        {paginatedData.map((item, index) => (
          <Flex key={index}>
            <Td width="20%" height={56}>
              <ItemName>
                {item.itemName}
                <button
                  type="button"
                  aria-label={`${item.itemName} 상세 정보 보기`}
                  onClick={() => handleItemClick(item.itemId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                  }}
                >
                  <IconLink width={24} />
                </button>
              </ItemName>
            </Td>
            <Td width="20%" height={56}>
              {item.studentName}
            </Td>
            <Td width="20%" height={56}>
              {item.receivedAt}
            </Td>
            <Td width="20%" height={56}>
              <StatusText $status={item.status}>
                {item.status === 'paid' ? '지급' : '미지급'}
              </StatusText>
            </Td>
            <Td width="20%" height={56}>
              <ConvertButton
                type="button"
                onClick={() => handleConvert(item.itemId, item.studentId)}
                disabled={
                  item.status === 'paid' ||
                  loadingItems.has(`${item.itemId}-${item.studentId}`)
                }
              >
                <IconConvert width={24} />
              </ConvertButton>
            </Td>
          </Flex>
        ))}
      </TableWrapper>
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </PaginationWrapper>
    </StyledPointTable>
  );
};

export default PointTable;

const StyledPointTable = styled.div`
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

const StatusText = styled.span<{ $status: 'paid' | 'unpaid' }>`
  ${font.p2}
  color: ${({ $status }) => ($status === 'paid' ? color.green : color.red)};
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

  &:hover:not(:disabled) {
    background-color: ${color.gray100};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LoadingMessage = styled.div`
  ${font.p1}
  color: ${color.gray500};
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  ${font.p1}
  color: ${color.red};
  text-align: center;
  padding: 40px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const EmptyMessage = styled.div`
  ${font.p1}
  color: ${color.gray500};
  text-align: center;
  padding: 40px;
`;