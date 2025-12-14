'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import { useDisposalHistory } from '@/app/disposal-history/disposal-history.hooks';
import color from '@styles/color';
import { Item } from '@/types/item/client';

interface DisposalHistoryItem extends Item {
  disposalDate: string;
}

const DisposalHistoryPage = () => {
  const { filters, options } = useDisposalHistory();

  const mockDisposalHistoryItems: DisposalHistoryItem[] = [
    {
      id: 1,
      name: '긱시크 안경',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: '기타',
      foundPlaceDetail: '운동장',
      status: 'DISCARDED',
      disposalDate: '2025.07.01 폐기',
    },
    {
      id: 2,
      name: '검정 우산',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: 'SRC',
      foundPlaceDetail: '4층 맨 끝 비상계단',
      status: 'DISCARDED',
      disposalDate: '2025.07.01 폐기',
    },
    {
      id: 3,
      name: '무선 이어폰 (버즈2)',
      imageUrl: '',
      foundAt: '2025.06.19.',
      foundPlace: 'SRC',
      foundPlaceDetail: '3층 남자기숙사 중앙홀',
      status: 'DISCARDED',
      disposalDate: '2025.07.01 폐기',
    },
  ];

  return (
    <StyledDisposalHistoryPage>
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
            width="100px"
          />

          <FilterActiveTags
            filters={filters.filters}
            onRemove={filters.handleRemoveFilter}
          />
        </Flex>
      </FilterSection>

      <DisposalHistoryList>
        {mockDisposalHistoryItems.map((item) => (
          <DisposalHistoryItem key={item.id}>
            <Flex direction="row" gap={20} align="center" width="755px">
              <ProductImage
                src={item.imageUrl}
                alt="분실물 사진"
                width={98}
                height={98}
              />
              <Flex direction="column" justify="space-between" height="100%">
                <Text variant="H2">{item.name}</Text>
                <Text variant="p2" color={color.gray200}>
                  {item.foundAt}
                </Text>
                <Text variant="p2">
                  {item.foundPlace} / {item.foundPlaceDetail}
                </Text>
              </Flex>
            </Flex>
            <DisposalDate>
              <Text variant="p2">{item.disposalDate}</Text>
            </DisposalDate>
          </DisposalHistoryItem>
        ))}
      </DisposalHistoryList>
    </StyledDisposalHistoryPage>
  );
};

const StyledDisposalHistoryPage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DisposalHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DisposalHistoryItem = styled.div`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${color.gray200} 1px solid;
  border-radius: 8px;
  background: white;
`;

const ProductImage = styled.img`
  border-radius: 12px;
  object-fit: contain;
  width: 98px;
  height: 98px;
  background: ${color.gray100};
`;

const DisposalDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
`;

export default DisposalHistoryPage;
