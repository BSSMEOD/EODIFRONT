import { useState } from 'react';
import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';
import IconCheck from '@/icons/src/IconCheck';

interface DisposalReasonModalProps {
  isOpen: boolean;
  itemId: number;
  itemName: string;
  remainDays: number;
  onClose: () => void;
  onSubmit: (itemId: number, reason: string, days: number) => void;
}

const DisposalReasonModal = ({
  isOpen,
  itemId,
  itemName,
  remainDays,
  onClose,
  onSubmit,
}: DisposalReasonModalProps) => {
  const [reason, setReason] = useState('');
  const [days, setDays] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(itemId, reason, days);
      onClose();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <BackgroundBlur />
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Title>{itemName}의 보류 사유를 입력해주세요.</Title>
        <SubTitle>{remainDays}일 남았어요.</SubTitle>
        <DaysInputWrapper>
          <DaysLabel>보류 일수</DaysLabel>
          <DaysInput
            type="number"
            min="1"
            max="90"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
          <DaysUnit>일</DaysUnit>
        </DaysInputWrapper>
        <TextAreaWrapper>
          <StyledTextArea
            placeholder="내용을 입력해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </TextAreaWrapper>
        <SubmitButton onClick={handleSubmit}>
          <IconCheck width={20} height={20} color={color.white} />
          <span>입력했습니다</span>
        </SubmitButton>
      </StyledModal>
    </Overlay>
  );
};

export default DisposalReasonModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(1px);
  cursor: pointer;
`;

const StyledModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 40px;
  background-color: ${color.white};
  border-radius: 20px;
  z-index: 1;
`;

const Title = styled.h2`
  ${font.H1}
  color: ${color.black};
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  ${font.p2}
  color: ${color.gray500};
  margin-bottom: 24px;
`;

const DaysInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const DaysLabel = styled.label`
  ${font.p1}
  color: ${color.black};
  font-weight: 600;
`;

const DaysInput = styled.input`
  ${font.p1}
  width: 80px;
  height: 40px;
  padding: 0 12px;
  background-color: ${color.gray100};
  border: none;
  border-radius: 8px;
  text-align: center;
  outline: none;

  &:focus {
    outline: 2px solid ${color.primary};
  }
`;

const DaysUnit = styled.span`
  ${font.p1}
  color: ${color.gray500};
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const StyledTextArea = styled.textarea`
  ${font.p2}
  width: 100%;
  height: 240px;
  padding: 20px;
  background-color: ${color.gray100};
  border: none;
  border-radius: 12px;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${color.gray500};
  }

  &:focus {
    box-shadow: 0 4px 20px rgba(135, 206, 235, 0.1);
    outline: 2px solid ${color.primary};
  }
`;

const SubmitButton = styled.button`
  ${font.p1}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 56px;
  background-color: ${color.secondary};
  color: ${color.white};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
