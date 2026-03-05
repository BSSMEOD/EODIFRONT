import { ReactNode } from 'react';
import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import { Button } from '@components/common/Button/Button';
import type { ButtonStyleType } from '@components/common/Button/Button.type';
import Text from '@components/common/Text/Text';
import { IconClose } from '@/icons/src/IconClose';
import IconCheck from '@/icons/src/IconCheck';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useModalKeyboard } from '@/hooks/useModalKeyboard';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  width?: string;
  children: ReactNode;
  confirmButtonType?: ButtonStyleType;
  cancelButtonType?: ButtonStyleType;
  titleId?: string;
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
  cancelButtonType = 'GHOST_SECONDARY',
  titleId,
}: BaseModalProps) => {
  useScrollLock(isOpen);
  useModalKeyboard(isOpen, onClose);

  const getButtonTextColor = (styleType: ButtonStyleType) => {
    const colorMap: Record<ButtonStyleType, string> = {
      PRIMARY: color.white,
      SECONDARY: color.white,
      TERTIARY: color.black,
      GHOST: color.black,
      GHOST_SECONDARY: color.secondary,
      GHOST_DANGER: color.red,
      DANGER: color.white,
    };
    return colorMap[styleType];
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        width={width}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <Flex direction="column" gap={10}>
          {children}

          <Flex justify="center" gap={8}>
            <Button styleType={cancelButtonType} size="modal" onClick={onClose}>
              <IconClose width={24} height={24} />
              <Text variant="p2" color={getButtonTextColor(cancelButtonType)}>
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
                <Text
                  variant="p2"
                  color={getButtonTextColor(confirmButtonType)}
                >
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
