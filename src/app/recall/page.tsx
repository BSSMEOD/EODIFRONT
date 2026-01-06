'use client';

import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Dropdown from '@components/common/Dropdown/Dropdown';
import Pagination from '@components/common/Pagination/Pagination';
import RecallRequestList from '@components/recall/RecallRequestList/RecallRequestList';
import { useRecallManagement } from './recall.hooks';
import { RECALL_STATUS_OPTIONS } from '@/constants/recall/constant';

const RecallPage = () => {
  const { filters, options, data, modals, actions } = useRecallManagement();

  const handleStatusChange = (value: string) => {
    filters.handleStatusChange(
      value as 'PENDING' | 'APPROVED' | 'REJECTED' | ''
    );
  };

  const currentStatusLabel =
    RECALL_STATUS_OPTIONS.find((option) => option.value === filters.status)
      ?.label || '전체';
  const currentSortLabel = filters.sort
    ? options.sortOptions.find((option) => option.value === filters.sort)
        ?.label || '정렬'
    : '정렬';

  return (
    <StyledRecallPage>
      <Flex align="center" gap={12} wrap="wrap">
        <Dropdown
          name="status"
          data={RECALL_STATUS_OPTIONS.map((option) => option.label)}
          value={currentStatusLabel}
          onChange={(label) => {
            const option = RECALL_STATUS_OPTIONS.find(
              (opt) => opt.label === label
            );
            if (option) handleStatusChange(option.value);
          }}
          placeholder="상태 선택"
          width="120px"
        />
        <Dropdown
          name="sort"
          data={options.sortOptions.map((option) => option.label)}
          value={currentSortLabel}
          onChange={(label) => {
            const option = options.sortOptions.find(
              (opt) => opt.label === label
            );
            if (option) filters.handleDropdownChange('sort')(option.value);
          }}
          placeholder="정렬"
          width="120px"
        />
      </Flex>

      <RecallRequestList
        requests={data.requests}
        isLoading={data.isLoading}
        error={data.error instanceof Error ? data.error : null}
        modals={modals}
        actions={actions}
        filters={filters}
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
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
