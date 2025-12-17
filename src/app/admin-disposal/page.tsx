'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BigProductList from '@components/common/ProductList/BigProductList';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import DisposalConfirmModal from '@/components/admin-disposal/DisposalConfirmModal/DisposalConfirmModal';
import ExtensionModal from '@/components/admin-disposal/ExtensionModal/ExtensionModal';
import { useAdminDisposal } from '@/app/admin-disposal/admin-disposal.hooks';
import color from '@styles/color';
import IconHistory from '@/icons/src/IconHistory';

const AdminDisposalPage = () => {
  const mockDisposalItems = [
    {
      id: 1,
      name: '긱시크 안경',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: '기타',
      foundPlaceDetail: '운동장',
      status: 'TO_BE_DISCARDED' as const,
      daysToDisposal: 5,
    },
    {
      id: 2,
      name: '검정 우산',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: 'SRC',
      foundPlaceDetail: '4층 맨 끝 비상계단',
      status: 'TO_BE_DISCARDED' as const,
      daysToDisposal: 3,
    },
    {
      id: 3,
      name: '무선 이어폰 (버즈2)',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: 'SRC',
      foundPlaceDetail: '3층 남자기숙사 중앙홀',
      status: 'TO_BE_DISCARDED' as const,
      daysToDisposal: 5,
    },
  ];

  const { filters, options, modals } = useAdminDisposal(mockDisposalItems);

  return (
    <StyledAdminDisposalPage>
      <FilterSection>
        <Flex gap={12} align="center">
          <Dropdown
            data={options.disposalDateOptions}
            onChange={filters.handleDropdownChange('disposalDate')}
            name="disposalDate"
            placeholder="폐기 예정일"
            value={filters.filters.disposalDate}
            width="140px"
          />
          <Dropdown
            data={options.categoryOptions}
            onChange={filters.handleDropdownChange('category')}
            name="category"
            placeholder="물품"
            value={filters.filters.category}
            width="140px"
          />
          <FilterDateSelect
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={filters.handleDateChange}
          />
          <Dropdown
            data={options.locationOptions}
            onChange={filters.handleDropdownChange('location')}
            name="location"
            placeholder="장소"
            value={filters.filters.location}
            width="140px"
          />

          <FilterActiveTags
            filters={filters.filters}
            onRemove={filters.handleRemoveFilter}
          />
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
      </FilterSection>

      <BigProductList
        productList={mockDisposalItems}
        disposalMode={true}
        onDisposal={modals.handleDisposal}
        onExtension={modals.handleExtension}
      />

      <DisposalConfirmModal
        isOpen={modals.isDisposalModalOpen}
        item={modals.selectedItem}
        onClose={modals.handleCloseModals}
        onConfirm={modals.handleDisposalConfirm}
      />

      <ExtensionModal
        isOpen={modals.isExtensionModalOpen}
        item={modals.selectedItem}
        onClose={modals.handleCloseModals}
        onConfirm={modals.handleExtensionConfirm}
      />
    </StyledAdminDisposalPage>
  );
};

const StyledAdminDisposalPage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default AdminDisposalPage;
