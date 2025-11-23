import React, { useState } from 'react';
import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';
import IconCheck from '@package/icon/src/IconCheck';
import { IconClose } from '@package/icon';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ClaimModal = ({ isOpen, onClose, onSubmit }: ClaimModalProps) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      onClose();
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <BlurBackground $isOpen={isOpen} onClick={handleBackgroundClick}>
      <StyledClaimModal>
        <Flex direction="column" gap={15} width={342}>
          <Text variant="H2" color={color.black}>
            소유권 주장하기
          </Text>

          <TextAreaWrapper>
            <StyledTextArea
              placeholder="소유권을 주장하는 이유를 상세히 작성해주세요."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </TextAreaWrapper>

          <Flex gap={8} width="100%">
            <CancelButton onClick={onClose}>
              <IconClose />
              <Text variant="p2" color={color.secondary}>
                취소
              </Text>
            </CancelButton>

            <SubmitButton onClick={handleSubmit}>
              <IconCheck width={24} height={24} />
              <Text variant="p2" color={color.white}>
                등록
              </Text>
            </SubmitButton>
          </Flex>
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

const TextAreaWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const StyledTextArea = styled.textarea`
  ${font.p2}
  width: 100%;
  height: 200px;
  padding: 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray500};
  border-radius: 8px;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${color.gray500};
  }

  &:focus {
    border-color: ${color.primary};
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: ${color.white};
  border: 1px solid ${color.secondary};
`;

const SubmitButton = styled(BaseButton)`
  background-color: ${color.secondary};
  border: none;
`;
