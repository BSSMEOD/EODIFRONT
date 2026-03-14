import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import IconCheck from '@/icons/src/IconCheck';
import { IconClose } from '@/icons';
import { IconClock } from '@/icons/src/IconClock';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useScrollLock } from '@hooks/useScrollLock';
import { Button } from '@components/common/Button/Button';
import DateSelector from '@components/common/DateSelector/DateSelector';
import { useItemClaimMutation } from '@services/item/mutations';
import { useFindDetailQuery } from '@services/item/queries';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ClaimModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ClaimModal = ({ id, isOpen, onClose }: ClaimModalProps) => {
  const [visitDate, setVisitDate] = useState<Date | null>(null);

  const { data: itemData } = useFindDetailQuery(id);

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const outsideClickRef = useOutsideClick(onClose);
  const { mutate: itemClaimMutate } = useItemClaimMutation(id);

  useScrollLock(isOpen);

  const maxDate = itemData?.disposalDate
    ? new Date(itemData.disposalDate)
    : undefined;

  const handleSubmit = () => {
    if (!visitDate) {
      return;
    }

    itemClaimMutate(
      { visitDate: format(visitDate, 'yyyy-MM-dd') },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledClaimModal ref={outsideClickRef}>
        <Flex direction="column" gap={15}>
          <Flex direction="row" justify="space-between" align="center">
            <Flex direction="column" gap={4}>
              <Text variant="H2" color={color.black}>
                회수 요청하기
              </Text>
              <Text variant="p2" color={color.black}>
                방문 예정 날짜를 선택해주세요.
              </Text>
            </Flex>
            <IconClose
              width={24}
              height={24}
              onClick={onClose}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
          <Flex direction="column" gap={0}>
            <DateSelector
              inline
              selected={visitDate}
              onChange={setVisitDate}
              noShadow
              filterDate={isWeekday}
              minDate={new Date()}
              maxDate={maxDate}
            />
            {visitDate && (
              <Flex direction="column" gap={4} align="center">
                <Text variant="p2" color={color.black}>
                  {format(visitDate, 'yyyy년 M월 d일 (E)', { locale: ko })}
                </Text>
                <Flex align="center" gap={4}>
                  <IconClock width={16} height={16} />
                  <Text variant="p3" color={color.gray500}>
                    점심시간 1시 10분
                  </Text>
                </Flex>
              </Flex>
            )}
          </Flex>
          <Button styleType="SECONDARY" onClick={handleSubmit}>
            <IconCheck width={24} height={24} />
            <Text variant="p2" color={color.white}>
              등록
            </Text>
          </Button>
        </Flex>
      </StyledClaimModal>
    </BlurBackground>
  );
};

export default ClaimModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(1px);
  z-index: 1000;
`;

const StyledClaimModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  background-color: ${color.white};
  border-radius: 8px;
  box-sizing: border-box;
`;
