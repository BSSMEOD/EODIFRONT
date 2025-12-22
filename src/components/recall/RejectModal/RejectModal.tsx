import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseModal from '@components/common/Modal/BaseModal';
import color from '@styles/color';
import { Item } from '@/types/item/client';
import IconStacks from '@/icons/src/IconStacks';

interface RejectModalProps {
  isOpen: boolean;
  item: Item | null;
  onClose: () => void;
  onConfirm: (id: number, reason: string) => void;
}

const RejectModal = ({
  isOpen,
  item,
  onClose,
  onConfirm,
}: RejectModalProps) => {
  const [rejectReason, setRejectReason] = useState('');
  const [isError, setIsError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!item) return;

    const trimmedReason = rejectReason.trim();
    if (trimmedReason) {
      onConfirm(item.id, trimmedReason);
      setRejectReason('');
      setIsError(false);
      onClose();
    } else {
      setIsError(true);
      textareaRef.current?.focus();
    }
  };

  const handleClose = () => {
    setRejectReason('');
    setIsError(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRejectReason(e.target.value);
    if (isError && e.target.value.trim()) {
      setIsError(false);
    }
  };

  if (!item) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      confirmText="확인"
      cancelText="취소"
    >
      <Flex direction="column" gap={8}>
        <Flex gap={4} align="center">
          <IconStacks width={16} height={16} />
          <Text variant="p4" color={color.gray500}>
            물품명: {item.name}
          </Text>
        </Flex>

        <ModalInputContainer>
          <Text variant="p4" color={color.gray500}>
            반려 사유
          </Text>
          <ModalTextarea
            ref={textareaRef}
            value={rejectReason}
            onChange={handleChange}
            placeholder="반려 사유를 입력해주세요."
            rows={4}
            $isError={isError}
          />
          {isError && (
            <Text variant="p4" color={color.red}>
              반려 사유를 입력해주세요.
            </Text>
          )}
        </ModalInputContainer>
      </Flex>
    </BaseModal>
  );
};

const ModalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`;

const ModalTextarea = styled.textarea<{ $isError?: boolean }>`
  width: 100%;
  min-height: 113px;
  padding: 10px;
  border: 1px solid ${({ $isError }) => ($isError ? color.red : color.gray500)};
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
    border-color: ${({ $isError }) => ($isError ? color.red : color.secondary)};
  }
`;

export default RejectModal;
