'use client';

import Dropdown from '@components/common/Dropdown/Dropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BigProductList from '@components/common/ProductList/BigProductList';
import ExtensionModal from '@/components/admin-disposal/ExtensionModal/ExtensionModal';
import { useAdminDisposal } from '@/app/admin-disposal/admin-disposal.hooks';
import color from '@styles/color';
import IconHistory from '@/icons/src/IconHistory';
import Pagination from '@components/common/Pagination/Pagination';
import { useRequireRole } from '@hooks/useRequireRole';
import { useMobileBlock } from '@hooks/useMobileBlock';

const AdminDisposalPage = () => {
  useRequireRole('ADMIN');
  useMobileBlock();

  const { filters, options, modals, data } = useAdminDisposal();

  return (
    <Flex
      direction="column"
      gap={20}
      width="100%"
      style={{ paddingTop: '32px' }}
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

export default AdminDisposalPage;
