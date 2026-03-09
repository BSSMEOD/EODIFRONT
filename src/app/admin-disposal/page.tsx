'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BigProductList from '@components/common/ProductList/BigProductList';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import ExtensionModal from '@/components/admin-disposal/ExtensionModal/ExtensionModal';
import IconMinus from '@/icons/src/IconMinus';
import { useAdminDisposal } from '@/app/admin-disposal/admin-disposal.hooks';
import color from '@styles/color';
import IconHistory from '@/icons/src/IconHistory';
import Pagination from '@components/common/Pagination/Pagination';
import { useRequireRole } from '@hooks/useRequireRole';

const AdminDisposalPage = () => {
  useRequireRole('ADMIN');

  const { filters, options, modals, data, utils } = useAdminDisposal();

  return (
    <Flex
      direction="column"
      gap={20}
      width="100%"
      style={{ paddingTop: '59px' }}
    >
      <Flex justify="space-between" align="center">
        <Flex gap={12} align="center" wrap="wrap">
          <Dropdown
            data={options.disposalDateOptions}
            onChange={filters.handleDropdownChange('disposalDate')}
            name="disposalDate"
            placeholder="폐기 예정일"
            value={filters.filters.disposalDate}
            width="120px"
          />
          <MultiSelectDropdown
            name="categories"
            data={options.categoryOptions}
            onChange={filters.handleMultiSelectChange}
            placeholder="물품"
            value={filters.filters.categories}
            width="120px"
          />
          <FilterDateSelect
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={filters.handleDateChange}
          />
          <MultiSelectDropdown
            name="locations"
            data={options.locationOptions}
            onChange={filters.handleMultiSelectChange}
            placeholder="장소"
            value={filters.filters.locations}
            width="120px"
          />

          {filters.filters.categories.length > 0 && (
            <FilterTag>
              <span>
                {filters.filters.categories.length === 1
                  ? utils.getCategoryLabel(filters.filters.categories[0])
                  : `${utils.getCategoryLabel(filters.filters.categories[0])} 외 ${filters.filters.categories.length - 1}`}
              </span>
              <RemoveButton
                onClick={() => filters.handleRemoveFilter('categories')}
              >
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}

          {filters.filters.locations.length > 0 && (
            <FilterTag>
              <span>
                {filters.filters.locations.length === 1
                  ? utils.getLocationLabel(filters.filters.locations[0])
                  : `${utils.getLocationLabel(filters.filters.locations[0])} 외 ${filters.filters.locations.length - 1}`}
              </span>
              <RemoveButton
                onClick={() => filters.handleRemoveFilter('locations')}
              >
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}

          {filters.filters.date && (
            <FilterTag>
              <span>{filters.filters.date}</span>
              <RemoveButton onClick={() => filters.handleRemoveFilter('date')}>
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}
        </Flex>

        <Flex
          gap={3}
          style={{ cursor: 'pointer' }}
          onClick={filters.handleDisposalHistory}
        >
          <IconHistory />
          <Text variant="p2" color={color.gray500}>
            폐기 이력
          </Text>
        </Flex>
      </Flex>

      {data.isLoading ? (
        <Flex justify="center" align="center" height={200}>
          <Text variant="p1" color={color.gray500}>
            물품 목록을 불러오는 중...
          </Text>
        </Flex>
      ) : data.error ? (
        <Flex justify="center" align="center" height={200}>
          <Text variant="p1" color={color.red}>
            물품 목록을 불러오는 중 오류가 발생했습니다.
          </Text>
        </Flex>
      ) : (
        <>
          <BigProductList
            productList={data.disposalItems}
            disposalMode={true}
            onExtension={modals.handleExtension}
          />
          {data.totalPages > 1 && (
            <Flex justify="center" style={{ marginTop: '40px' }}>
              <Pagination
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={data.handlePageChange}
                maxVisiblePages={5}
              />
            </Flex>
          )}
        </>
      )}

      <ExtensionModal
        isOpen={modals.isExtensionModalOpen}
        item={modals.selectedItem}
        onClose={modals.handleCloseModals}
        onConfirm={modals.handleExtensionConfirm}
      />
    </Flex>
  );
};

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.secondary};
  color: ${color.white};
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;

  span {
    white-space: nowrap;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export default AdminDisposalPage;
