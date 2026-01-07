import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import StatusBadge from '@components/common/StatusBadge/StatusBadge';
import { Button } from '@components/common/Button/Button';
import { RecallRequestItem } from '@/types/recall/client';
import { RECALL_STATUS } from '@/constants/recall/constant';
import font from '@styles/font';
import { formatDateDot } from '@utils/formatDate';
import { useState } from 'react';

interface RecallListItemProps {
  item: RecallRequestItem;
  isRejectModalOpen?: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const RecallListItem = ({
  item,
  isRejectModalOpen = false,
  onApprove,
  onReject,
}: RecallListItemProps) => {
  const {
    id,
    imageUrl,
    name,
    requestMessage,
    requesterName,
    requestedAt,
    recallStatus,
  } = item;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <StyledRecallListItem>
      <Flex direction="row" gap={20} align="center">
        {imageUrl && !imageError ? (
          <ProductImage
            src={imageUrl}
            alt="분실물 사진"
            width={98}
            height={98}
            onError={handleImageError}
          />
        ) : (
          <ProductImagePlaceholder />
        )}
        <InfoSection>
          <Flex direction="row" gap={8} align="end">
            <StatusBadge
              bgColor={
                recallStatusColor[
                  recallStatus as keyof typeof recallStatusColor
                ]
              }
            >
              {RECALL_STATUS[recallStatus as keyof typeof RECALL_STATUS]}
            </StatusBadge>
            <Text variant="H2">{name}</Text>
            {requesterName && (
              <Text variant="p2" color={color.gray400}>
                {requesterName}
              </Text>
            )}
          </Flex>
          <Flex direction="column" gap={8}>
            {requestedAt && (
              <Text variant="p2" color={color.gray400}>
                {formatDateDot(requestedAt)}
              </Text>
            )}
            {requestMessage && <Text variant="p1">{requestMessage}</Text>}
          </Flex>
        </InfoSection>
      </Flex>

      <Flex gap={10} align="center">
        {recallStatus === 'PENDING' ? (
          <>
            <Button
              styleType={isRejectModalOpen ? 'DANGER' : 'GHOST_DANGER'}
              size="compact"
              onClick={() => onReject(id)}
            >
              반려
            </Button>
            <Button
              styleType="SECONDARY"
              size="compact"
              onClick={() => onApprove(id)}
            >
              승인
            </Button>
          </>
        ) : (
          <StatusText recallStatus={recallStatus}>
            {recallStatus === 'APPROVED' ? '승인 완료' : '반려됨'}
          </StatusText>
        )}
      </Flex>
    </StyledRecallListItem>
  );
};

const StyledRecallListItem = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  border: ${color.gray200} 1px solid;
  border-radius: 8px;
`;

const ProductImage = styled(Image)`
  border-radius: 12px;
  object-fit: cover;
  width: 98px;
  height: 98px;
  background: ${color.gray100};
  flex-shrink: 0;
`;

const ProductImagePlaceholder = styled.div`
  border-radius: 12px;
  width: 98px;
  height: 98px;
  background: ${color.gray100};
  flex-shrink: 0;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  flex: 1;
  min-width: 0;
  gap: 5px;
`;

const recallStatusColor = {
  PENDING: '#FFCC00',
  APPROVED: '#14C600',
  REJECTED: '#FF2727',
};

const StatusText = styled.div<{ recallStatus?: string }>`
  ${font.p2};
  color: ${({ recallStatus }) =>
    recallStatus === 'APPROVED'
      ? '#14C600'
      : recallStatus === 'REJECTED'
        ? '#FF2727'
        : color.gray400};
  font-weight: 600;
`;

export default RecallListItem;
