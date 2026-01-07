'use client';

import styled from '@emotion/styled';
import ImageUploader from '@components/register/ImageUploader/ImageUploader';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import InputDropdown from '@components/common/Dropdown/InputDropdown';
import { CATEGORY } from '@/constants/item/constant';
import { useForm } from '@app/register/register.hooks';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from '@components/common/DateSelector/DateSelector';
import { IconCalendar } from '@/icons/src/IconCalendar';
import React, { useState } from 'react';
import { usePlaceListQuery } from '@services/item/queries';
import { useBooleanState } from '@hooks/useBooleanState';

const step = ['year', 'month', 'date'] as const;

const RegisterPage = () => {
  const {
    fileRef,
    form,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleSubmit,
    handleFileChange,
  } = useForm();
  const { data: placeListData } = usePlaceListQuery();
  const placeOptions =
    placeListData?.map((place) => ({
      label: place.name,
      value: place.id.toString(),
    })) ?? [];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const {
    value: isDateOpen,
    setTrue: setDateOpen,
    setFalse: setDateClose,
  } = useBooleanState(false);

  const handleChange = (date: Date | null) => {
    handleDateChange(date, step[currentStep]);
    setCurrentStep((prev) => {
      if (currentStep >= step.length - 1) {
        setDateClose();
      }
      return (prev + 1) % step.length;
    });
  };

  const handleDateInputClick = () => {
    setDateOpen();
    setCurrentStep(0);
    handleDateChange(null);
  };

  return (
    <StyledRegisterPage>
      <Flex direction="row" justify="space-between" align="center">
        <Text variant="H2">분실물 등록하기</Text>
        <Button styleType="SECONDARY" onClick={handleSubmit}>
          등록
        </Button>
      </Flex>
      <Flex direction="row" gap={52}>
        <ImageUploader ref={fileRef} onFileChange={handleFileChange} />
        <Flex direction="column" gap={24} style={{ flex: 1 }}>
          <Input
            label="물품명"
            placeholder="물품명 입력"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
          <Flex direction="row" gap={24}>
            <Input
              type="number"
              label="습득 신고자 학번(선택)"
              placeholder="습득 신고자 학번 입력"
              name="reporterStudentCode"
              value={form.reporterStudentCode ?? ''}
              onChange={handleFormChange}
            />
            <Input
              label="습득 신고자 이름(선택)"
              placeholder="습득 신고자 이름 입력"
              name="reporterName"
              value={form.reporterName}
              onChange={handleFormChange}
            />
          </Flex>
          <DateSelector
            placeholderText="습득 날짜 선택"
            selected={form.foundAt ? new Date(form.foundAt) : null}
            onChange={handleChange}
            showYearPicker={step[currentStep] === 'year'}
            showMonthYearPicker={step[currentStep] === 'month'}
            showPopperArrow={false}
            dateFormat={
              step[currentStep] === 'month'
                ? 'yyyy년'
                : step[currentStep] === 'date'
                  ? 'yyyy년 MM월'
                  : 'yyyy년 MM월 dd일'
            }
            open={isDateOpen}
            shouldCloseOnSelect={false}
            customInput={
              <Input
                label="습득 날짜"
                name="date"
                rightIcon={<IconCalendar width={24} height={24} />}
              />
            }
            onInputClick={handleDateInputClick}
            popperPlacement="bottom-end"
            onCalendarClose={setDateClose}
          />
          <Flex direction="row" gap={24}>
            <InputDropdown
              data={placeOptions}
              label="습득 장소"
              placeholder="습득 장소 선택"
              value={form.placeId}
              name="placeId"
              onChange={handleDropdownChange}
            />
            <Input
              label="습득 장소 상세"
              placeholder="습득 상세 입력"
              value={form.foundPlaceDetail}
              name="foundPlaceDetail"
              onChange={handleFormChange}
            />
          </Flex>
          <InputDropdown
            label="물품 카테고리"
            placeholder="물품 카테고리 선택"
            value={form.category}
            data={CATEGORY}
            onChange={handleDropdownChange}
            name="category"
          />
        </Flex>
      </Flex>
    </StyledRegisterPage>
  );
};

const StyledRegisterPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export default RegisterPage;
