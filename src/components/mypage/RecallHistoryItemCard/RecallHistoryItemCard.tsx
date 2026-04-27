'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import breakpoint from '@styles/breakpoint';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import { formatDateDot } from '@utils/formatDate';
import type { MyRecallItem } from '@/types/mypage/client';

interface RecallHistoryItemCardProps {
  item: MyRecallItem;
  onCancel?: (claimId: number) => void;
}

const RecallHistoryItemCard = ({
  item,
  onCancel,
}: RecallHistoryItemCardProps) => {
  const [imageError, setImageError] = useState(false);

  const renderStatus = () => {
    switch (item.status) {
      case 'APPROVED':
        return <StatusText statusColor={color.secondary300}>승인</StatusText>;
      case 'REJECTED':
        return <StatusText statusColor={color.red}>반려</StatusText>;
      case 'PENDING':
        return onCancel ? (
          <Button
            size="small"
            styleType="PRIMARY"
            outlined
            onClick={() => onCancel(item.claimId)}
          >
            신청 취소
          </Button>
        ) : (
          <StatusText statusColor={color.gray500}>대기중</StatusText>
        );
      default:
        return null;
    }
  };

  return (
    <ItemCard>
      <Flex align="center" gap={10}>
        {item.imageUrl && !imageError ? (
          <ItemImage
            src={item.imageUrl}
            alt={item.itemName}
            width={98}
            height={98}
            onError={() => setImageError(true)}
          />
        ) : (
          <ItemImagePlaceholder />
        )}
        <Flex direction="column" gap={8}>
          <Text variant="H3" color={color.black}>
            {item.itemName}
          </Text>
          <Text variant="p2" color={color.black}>
            {formatDateDot(item.requestedAt)}
          </Text>
        </Flex>
      </Flex>
      <StatusWrapper>{renderStatus()}</StatusWrapper>
    </ItemCard>
  );
};

export default RecallHistoryItemCard;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${color.gray200};
  border-radius: 8px;
  min-height: 118px;
  width: 100%;

  ${breakpoint.mobile} {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

const ItemImage = styled(Image)`
  width: 98px;
  height: 98px;
  border-radius: 12px;
  object-fit: cover;
  background-color: ${color.gray100};
  flex-shrink: 0;
`;

const ItemImagePlaceholder = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 12px;
  background-color: ${color.gray100};
  flex-shrink: 0;
`;

const StatusWrapper = styled.div`
  min-width: 191px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${breakpoint.mobile} {
    min-width: auto;
    width: 100%;
    justify-content: flex-end;
  }
`;

const StatusText = styled.div<{ statusColor: string }>`
  ${font.p2};
  font-weight: 600;
  color: ${({ statusColor }) => statusColor};
  text-align: center;
`;
