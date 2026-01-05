import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import color from '@styles/color';
import IconConvert from '@/icons/src/IconConvert';
import font from '@styles/font';
import IconLink from '@/icons/src/IconLink';
import { useRewardHistoryQuery } from '@/services/point/queries';
import { useGiveRewardMutation } from '@/services/point/mutations';
import type { PointItem } from '@/types/point/client';
import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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

  const { data, isLoading, error } = useRewardHistoryQuery({
    userId,
    date,
    grade,
    class: classNum,
  });
  const { mutateAsync } = useGiveRewardMutation();

  const pointData = useMemo<PointItem[]>(() => {
    if (!data?.histories) return [];

    return data.histories.map((item) => ({
      itemId: item.item_id,
      studentId: item.student_id,
      itemName: item.item_name,
      studentName: item.student_name,
      reporter: '',
      status: item.given_at ? 'paid' : 'unpaid',
      receivedAt: item.received_at,
      givenAt: item.given_at,
    }));
  }, [data]);

  const handleConvert = async (itemId: number, studentId: number) => {
    const key = `${itemId}-${studentId}`;

    if (loadingItems.has(key)) return;

    setLoadingItems((prev) => new Set(prev).add(key));

    try {
      await mutateAsync({ itemId, studentId });
      toast.success('상점이 성공적으로 지급되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reward', 'history'] });
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
        <LoadingMessage>데이터가 없습니다.</LoadingMessage>
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
        {pointData.map((item, index) => (
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

const EmptyMessage = styled.div`
  ${font.p1}
  color: ${color.gray500};
  text-align: center;
  padding: 40px;
`;
