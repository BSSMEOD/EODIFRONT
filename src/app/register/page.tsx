'use client';

import styled from '@emotion/styled';
import ImageUploader from '@components/register/ImageUploader/ImageUploader';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button/Button';
import Input from '@ui/Input/Input';
import InputDropdown from '@ui/Dropdown/InputDropdown';
import { CATEGORY } from '@/constants/product/constant';
import { useForm } from '@app/register/register.hooks';
import 'react-datepicker/dist/react-datepicker.css';

const ResisterPage = () => {
  const { fileRef, form, handleFormChange } = useForm();

  return (
    <StyledResisterPage>
      <Flex direction="row" justify="space-between" align="center">
        <Text variant="H2">분실물 등록하기</Text>
        <Button styleType="SECONDARY">등록</Button>
      </Flex>
      <Flex direction="row" gap={52}>
        <ImageUploader ref={fileRef} />
        <Flex direction="column" gap={24} style={{ flex: 1 }}>
          <Input
            label="물품명"
            placeholder="물품명 입력"
            name="name"
            onChange={handleFormChange}
          />
          <Input
            label="습득 신고자"
            placeholder="습득 신고자 입력"
            name="reporter"
            onChange={handleFormChange}
          />
          <Input
            label="습득 날짜"
            placeholder="습득 날짜 선택"
            type="date"
            name="date"
            onChange={handleFormChange}
          />
          <Input
            label="습득 장소"
            placeholder="습득 장소 입력"
            name="location"
            onChange={handleFormChange}
          />
          <InputDropdown
            label="물품 카테고리"
            placeholder="물품 카테고리 선택"
            value={form.category}
            data={CATEGORY}
            onChange={handleFormChange}
            name="category"
          />
        </Flex>
      </Flex>
    </StyledResisterPage>
  );
};

const StyledResisterPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export default ResisterPage;
