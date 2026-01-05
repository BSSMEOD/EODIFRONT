import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import IconLink from '@/icons/src/IconLink';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import color from '@styles/color';
import font from '@styles/font';
import { useLogListQuery } from '@/services/log/queries';
import type { GetLogListParams } from '@/types/log/params';
import { useRouter } from 'next/navigation';
import Pagination from '@components/common/Pagination/Pagination';
import { useState, useEffect } from 'react';

interface LogTableProps {
  filters?: GetLogListParams;
}

const LogTable = ({ filters }: LogTableProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { data, isLoading, isError } = useLogListQuery({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    ...filters,
  });

  const handleItemClick = (itemId: number) => {
    router.push(`/find/detail/${itemId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logData = data?.content || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return (
      <LogTableWrapper>
        <StatusMessage>데이터를 불러오는 중...</StatusMessage>
      </LogTableWrapper>
    );
  }

  if (isError) {
    return (
      <LogTableWrapper>
        <ErrorMessage>
          데이터를 불러오는데 실패했습니다. 다시 시도해 주세요.
        </ErrorMessage>
      </LogTableWrapper>
    );
  }

  if (logData.length === 0) {
    return (
      <LogTableWrapper>
        <StatusMessage>분실물 기록이 없습니다.</StatusMessage>
      </LogTableWrapper>
    );
  }

  return (
    <LogTableWrapper>
      <TableContent>
        <Flex width="100%" height={56}>
          <Th
            width="25%"
            height={56}
            borderTopLeftRadius={10}
            textColor={color.white}
          >
            습득한 날짜
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            습득한 장소
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            물품명
          </Th>
          <Th
            width="25%"
            height={56}
            borderTopRightRadius={10}
            textColor={color.white}
          >
            상세 장소
          </Th>
        </Flex>
        {logData.map((item) => (
          <Flex key={item.id}>
            <Td width="25%" height={56}>
              {item.foundAt}
            </Td>
            <Td width="25%" height={56}>
              {item.foundPlace}
            </Td>
            <Td width="25%" height={56}>
              <ItemName>
                {item.name}
                <IconLinkButton
                  aria-label={`${item.name} 상세 정보 보기`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <IconLink width={24} height={24} color={color.secondary} />
                </IconLinkButton>
              </ItemName>
            </Td>
            <Td width="25%" height={56}>
              {item.placeDetail}
            </Td>
          </Flex>
        ))}
      </TableContent>
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </PaginationWrapper>
    </LogTableWrapper>
  );
};

export default LogTable;

const LogTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableContent = styled.div`
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

const StatusMessage = styled.div`
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
