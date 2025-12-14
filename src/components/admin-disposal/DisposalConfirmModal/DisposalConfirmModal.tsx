import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import color from '@styles/color';
import { Item } from '@/types/item/client';
import { IconClose } from '@/icons/src/IconClose';
import IconCheck from '@/icons/src/IconCheck';
import IconStacks from '@/icons/src/IconStacks';
import { IconCalendar } from '@/icons/src/IconCalendar';

interface DisposalConfirmModalProps {
  isOpen: boolean;
  item: (Item & { daysToDisposal: number }) | null;
  onClose: () => void;
  onConfirm: (id: number, reason: string) => void;
}

const DisposalConfirmModal = ({
  isOpen,
  item,
  onClose,
  onConfirm,
}: DisposalConfirmModalProps) => {
  const [disposalReason, setDisposalReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    const trimmedReason = disposalReason.trim();
    if (trimmedReason) {
      onConfirm(item.id, trimmedReason);
      setDisposalReason('');
      onClose();
    } else {
      alert('폐기 사유를 입력해주세요.');
    }
  };

  const handleClose = () => {
    setDisposalReason('');
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Flex direction="column" gap={10}>
          <Flex direction="column" gap={8}>
            <Flex gap={4}>
              <Flex gap={4} align="center">
                <IconStacks width={16} height={16} />
                <Text variant="p4" color={color.gray500}>
                  물품명: {item.name}
                </Text>
              </Flex>
              <Flex gap={4} align="center">
                <IconCalendar width={16} height={16} />
                <Text variant="p4" color={color.gray500}>
                  폐기 날짜: D-{item.daysToDisposal}
                </Text>
              </Flex>
            </Flex>

            <ModalInputContainer>
              <Text variant="p4" color={color.gray500}>
                폐기 사유
              </Text>
              <ModalTextarea
                value={disposalReason}
                onChange={(e) => setDisposalReason(e.target.value)}
                placeholder="폐기 사유를 입력해주세요."
                rows={4}
              />
            </ModalInputContainer>
          </Flex>

          <Flex justify="center" gap={8}>
            <Button
              styleType="GHOST_SECONDARY"
              size="modal"
              onClick={handleClose}
            >
              <IconClose color={color.secondary} width={24} height={24} />
              <Text variant="p2" color={color.secondary}>
                취소
              </Text>
            </Button>

            <Button styleType="SECONDARY" size="modal" onClick={handleConfirm}>
              <IconCheck width={24} height={24} />
              <Text variant="p2" color={color.white}>
                폐기
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
  padding: 20px;
  width: 412px;
`;

const ModalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  min-height: 113px;
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

export default DisposalConfirmModal;
