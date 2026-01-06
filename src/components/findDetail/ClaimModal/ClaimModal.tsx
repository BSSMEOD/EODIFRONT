import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import IconCheck from '@/icons/src/IconCheck';
import { IconClose } from '@/icons';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { Button } from '@components/common/Button/Button';
import TextArea from '@components/common/TextArea/TextArea';
import { useItemClaimMutation } from '@services/item/mutations';
import { toast } from 'react-toastify';

interface ClaimModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ClaimModal = ({ id, isOpen, onClose }: ClaimModalProps) => {
  const [claimReason, setClaimReason] = useState('');
  const outsideClickRef = useOutsideClick(onClose);
  const { mutate: itemClaimMutate } = useItemClaimMutation(id, onClose);

  const handleSubmit = () => {
    if (!claimReason.trim()) {
      toast.warn('이유를 작성해주세요.');
      return;
    }

    itemClaimMutate({ claimReason });
  };

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledClaimModal ref={outsideClickRef}>
        <Flex direction="column" gap={15} width={342}>
          <Flex direction="row" justify="space-between" align="center">
            <Text variant="H2" color={color.black}>
              소유권 주장하기
            </Text>
            <IconClose
              width={24}
              height={24}
              onClick={onClose}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
          <TextArea
            height={178}
            placeholder="소유권을 주장하는 이유를 상세히 작성해주세요."
            value={claimReason}
            onChange={(e) => setClaimReason(e.target.value)}
          />
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
