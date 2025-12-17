import { useEffect, useRef, ReactNode } from 'react';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import { Button } from '@components/common/Button/Button';
import Text from '@components/common/Text/Text';
import color from '@styles/color';
import { IconClose } from '@/icons/src/IconClose';
import IconCheck from '@/icons/src/IconCheck';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  width?: string;
  children: ReactNode;
  confirmButtonType?: 'SECONDARY' | 'GHOST_DANGER';
}

const BaseModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  width = '412px',
  children,
  confirmButtonType = 'SECONDARY',
}: BaseModalProps) => {
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

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} width={width}>
        <Flex direction="column" gap={10}>
          {children}

          <Flex justify="center" gap={8}>
            <Button styleType="GHOST_SECONDARY" size="modal" onClick={onClose}>
              <IconClose color={color.secondary} width={24} height={24} />
              <Text variant="p2" color={color.secondary}>
                {cancelText}
              </Text>
            </Button>

            {onConfirm && (
              <Button
                styleType={confirmButtonType}
                size="modal"
                onClick={onConfirm}
              >
                <IconCheck width={24} height={24} />
                <Text variant="p2" color={color.white}>
                  {confirmText}
                </Text>
              </Button>
            )}
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

const ModalContent = styled.div<{ width: string }>`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: ${({ width }) => width};
`;

export default BaseModal;
