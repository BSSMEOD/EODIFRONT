import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import Dropdown from '@components/common/Dropdown/Dropdown';
import color from '@styles/color';
import { Item } from '@/types/item/client';
import { IconClose } from '@/icons/src/IconClose';
import IconCheck from '@/icons/src/IconCheck';
import IconStacks from '@/icons/src/IconStacks';
import { IconCalendar } from '@/icons/src/IconCalendar';

interface ExtensionModalProps {
  isOpen: boolean;
  item: (Item & { daysToDisposal: number }) | null;
  onClose: () => void;
  onConfirm: (id: number, extensionDays: number, reason: string) => void;
}

const ExtensionModal = ({
  isOpen,
  item,
  onClose,
  onConfirm,
}: ExtensionModalProps) => {
  const [extensionDays, setExtensionDays] = useState('7');
  const [extensionReason, setExtensionReason] = useState('');
  const originalOverflowRef = useRef<string | null>(null);
  const isOverflowSetByModalRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      if (originalOverflowRef.current === null) {
        originalOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';
      isOverflowSetByModalRef.current = true;
    }

    return () => {
      if (
        isOverflowSetByModalRef.current &&
        document.body.style.overflow === 'hidden'
      ) {
        document.body.style.overflow = originalOverflowRef.current || '';
      }
      if (!isOpen) {
        originalOverflowRef.current = null;
        isOverflowSetByModalRef.current = false;
      }
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const extensionOptions = [
    { label: '7일', value: '7' },
    { label: '14일', value: '14' },
    { label: '30일', value: '30' },
  ];

  // 공통 유틸 함수들
  const formatDateToKorean = (date: Date) => {
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, '');
  };

  const calculateDisposalDate = (
    baseDaysFromToday: number,
    additionalDays = 0
  ) => {
    const today = new Date();
    const totalDays = baseDaysFromToday + additionalDays;
    return new Date(today.getTime() + totalDays * 24 * 60 * 60 * 1000);
  };

  // 현재 폐기 예정일 계산
  const getCurrentDisposalDate = () => {
    const currentDisposalDate = calculateDisposalDate(item.daysToDisposal);
    return formatDateToKorean(currentDisposalDate);
  };

  // 새로운 폐기 예정일 계산
  const calculateNewDate = () => {
    const newDisposalDate = calculateDisposalDate(
      item.daysToDisposal,
      parseInt(extensionDays)
    );
    return formatDateToKorean(newDisposalDate);
  };

  const handleConfirm = () => {
    const trimmedReason = extensionReason.trim();
    if (trimmedReason) {
      onConfirm(item.id, parseInt(extensionDays), trimmedReason);
      setExtensionDays('7');
      setExtensionReason('');
      onClose();
    } else {
      alert('연장 사유를 입력해주세요.');
    }
  };

  const handleClose = () => {
    setExtensionDays('7');
    setExtensionReason('');
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Flex direction="column" gap={34}>
          <Flex direction="column" gap={8}>
            <Flex gap={4} align="center">
              <Flex gap={4} align="center">
                <IconStacks width={16} height={16} />
                <Text variant="p4" color={color.gray500}>
                  물품명: {item.name}
                </Text>
              </Flex>
              <Flex gap={4} align="center">
                <IconCalendar width={16} height={16} />
                <Text variant="p4" color={color.gray500}>
                  폐기 날짜: {getCurrentDisposalDate()}
                </Text>
              </Flex>
            </Flex>

            <Flex direction="column" gap={24}>
              <Flex gap={11} align="end">
                <ExtensionDaysContainer>
                  <Text variant="p4" color={color.gray500}>
                    연장 일수
                  </Text>
                  <Dropdown
                    data={extensionOptions}
                    value={extensionDays}
                    onChange={setExtensionDays}
                    name="extensionDays"
                    placeholder="일"
                    width="79px"
                  />
                </ExtensionDaysContainer>

                <NewDateContainer>
                  <Text variant="p4" color={color.gray500}>
                    새 폐기 예정일
                  </Text>
                  <NewDateDisplay>
                    <Text variant="p2" color={color.black}>
                      {calculateNewDate()}
                    </Text>
                  </NewDateDisplay>
                </NewDateContainer>
              </Flex>

              <ModalInputContainer>
                <Text variant="p4" color={color.gray500}>
                  연장 사유
                </Text>
                <ModalTextarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="연장 사유를 입력해주세요."
                  rows={4}
                />
              </ModalInputContainer>
            </Flex>
          </Flex>

          <Flex gap={8} justify="center">
            <Button
              styleType="GHOST_SECONDARY"
              size="modal"
              onClick={handleClose}
            >
              <IconClose width={24} height={24} color={color.secondary} />
              <Text variant="p2" color={color.secondary}>
                {'취소'}
              </Text>
            </Button>

            <Button styleType="SECONDARY" size="modal" onClick={handleConfirm}>
              <IconCheck width={24} height={24} color={color.white} />
              <Text variant="p2" color={color.white}>
                연장
              </Text>
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  width: 375px;
`;

const ExtensionDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 79px;
`;

const NewDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 225px;
`;

const NewDateDisplay = styled.div`
  background-color: ${color.gray200};
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  padding: 0 16px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const ModalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  min-height: 104px;
  padding: 10px;
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.352px;
  resize: vertical;

  &::placeholder {
    color: ${color.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${color.secondary};
  }
`;

export default ExtensionModal;
