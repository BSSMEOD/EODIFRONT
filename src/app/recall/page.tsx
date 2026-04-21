'use client';

import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Dropdown from '@components/common/Dropdown/Dropdown';
import Pagination from '@components/common/Pagination/Pagination';
import RecallRequestList from '@components/recall/RecallRequestList/RecallRequestList';
import { useRecallManagement } from './recall.hooks';
import { RECALL_STATUS_OPTIONS } from '@/constants/recall/constant';
import { useRouter } from 'next/navigation';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import { useFindDetailQuery } from '@services/item/queries';
import { useRequireRole } from '@hooks/useRequireRole';
import { useMobileBlock } from '@hooks/useMobileBlock';
import React from 'react';

interface PageProps {
  searchParams: Promise<{
    itemId?: string;
  }>;
}

const RecallPage = ({ searchParams }: PageProps) => {
  useRequireRole('ADMIN');
  useMobileBlock();
  const router = useRouter();

  const { itemId: itemIdParam } = React.use(searchParams);
  const itemId =
    itemIdParam && !isNaN(Number(itemIdParam))
      ? Number(itemIdParam)
      : undefined;

  const { filters, options, data, modals, actions } =
    useRecallManagement(itemId);

  const { data: itemData } = useFindDetailQuery(itemId);

  const item = itemId && itemData?.name ? { itemId: itemData.name } : undefined;

  const handleRemoveItemFilter = () => {
    router.push('/recall');
  };

  return (
    <StyledRecallPage>
      <Flex align="center" gap={12} wrap="wrap">
        <Dropdown
          placeholder="상태"
          name="status"
          data={RECALL_STATUS_OPTIONS}
          value={filters.status}
          onChange={filters.handleDropdownChange}
          width="120px"
        />

        <Dropdown
          name="sort"
          data={options.sortOptions}
          value={filters.sort}
          onChange={filters.handleDropdownChange}
          placeholder="정렬"
          width="120px"
        />

        {item && (
          <FilterActiveTags filters={item} onRemove={handleRemoveItemFilter} />
        )}
      </Flex>

      <RecallRequestList
        requests={data.requests}
        isLoading={data.isLoading}
        modals={modals}
        actions={actions}
      />

      {data.totalPages > 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={filters.handlePageChange}
          maxVisiblePages={5}
        />
      )}
    </StyledRecallPage>
  );
};

export default RecallPage;

const StyledRecallPage = styled.div`
  width: 100%;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
