'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import breakpoint from '@styles/breakpoint';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import type { MyRecallItem } from '@/types/mypage/client';

interface RecallHistoryItemCardProps {
  item: MyRecallItem;
  onCancel: (requestId: number) => void;
}

const RecallHistoryItemCard = ({
  item,
  onCancel,
}: RecallHistoryItemCardProps) => {
  const renderStatus = () => {
    switch (item.status) {
      case 'APPROVED':
        return <StatusText statusColor={color.secondary300}>승인</StatusText>;
      case 'REJECTED':
        return <StatusText statusColor={color.red}>반려</StatusText>;
      case 'PENDING':
        return (
          <Button
            size="small"
            styleType="PRIMARY"
            outlined
            onClick={() => onCancel(item.requestId)}
          >
            신청 취소
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <ItemCard>
      <Flex align="center" gap={10}>
        <ItemImage src={item.imageUrl} alt={item.itemName} />
        <Flex direction="column" gap={8}>
          <Text variant="H3" color={color.black}>
            {item.itemName}
          </Text>
          <Text variant="p2" color={color.black}>
            {item.requestedAt}
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

const ItemImage = styled.img`
  width: 98px;
  height: 98px;
  border-radius: 12px;
  object-fit: cover;
  opacity: 0.8;
  background-color: ${color.gray100};
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
