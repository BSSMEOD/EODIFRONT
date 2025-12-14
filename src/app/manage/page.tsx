'use client';

import styled from '@emotion/styled';
import BigProductList from '@components/common/ProductList/BigProductList';
import SearchInput from '@components/common/Input/SearchInput';
import Dropdown from '@components/common/Dropdown/Dropdown';
import { CATEGORY } from '@/constants/item/constant';
import Flex from '@components/common/Flex/Flex';
import { useForm } from '@app/manage/manage.hooks';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { useItemListQuery, usePlaceListQuery } from '@services/item/queries';

const ManagePage = () => {
  const { filters, handleInputChange, handleDropdownChange, handleDateChange } =
    useForm();

  const { data: productListData } = useItemListQuery({
    page: 0,
    size: 10,
    placeId: filters.placeId,
  });

  const categoryOptions = CATEGORY.map((category) => ({
    label: category,
    value: category,
  }));

  const { data: placeListData } = usePlaceListQuery();
  const placeOptions =
    placeListData?.map((place) => ({
      label: place.name,
      value: String(place.id),
    })) ?? [];

  return (
    <StyledManagePage>
      <SearchInput
        value={filters.search}
        onChange={handleInputChange}
        name="search"
      />
      <Flex gap={12} align="center">
        <Dropdown
          data={categoryOptions}
          onChange={handleDropdownChange}
          name="category"
          placeholder="카테고리"
          value={filters.category}
          width={120}
        />
        <FilterDateSelect
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={handleDateChange}
        />
        <Dropdown
          data={placeOptions}
          onChange={handleDropdownChange}
          name="placeId"
          placeholder="장소"
          value={filters.placeId}
          width={100}
        />
      </Flex>
      <BigProductList productList={productListData?.content || []} auth />
    </StyledManagePage>
  );
};

const StyledManagePage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ManagePage;
