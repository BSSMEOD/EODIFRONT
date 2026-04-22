import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import StatusBadge from '@components/common/StatusBadge/StatusBadge';
import { Button } from '@components/common/Button/Button';
import { ROUTES } from '@/constants/common/constants';
import { Item } from '@/types/item/client';
import Link from 'next/link';
import { STATUS } from '@/constants/item/constant';
import { IconClose, IconEdit } from '@/icons';
import { formatDateDot } from '@utils/formatDate';
import { useState } from 'react';
import { useItemDeleteMutation } from '@services/item/mutations';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import BaseModal from '@components/common/Modal/BaseModal';

interface ProductListItem {
  product: Item & {
    daysToDisposal?: number;
  };
  size: 'small' | 'medium' | 'big';
  showStatus?: boolean;
  auth?: boolean;
  disposalMode?: boolean;
  onExtension?: (id: number) => void;
  rightContent?: React.ReactNode;
}

const ProductListItem = ({
  product,
  size,
  showStatus = false,
  auth = false,
  disposalMode = false,
  onExtension,
  rightContent,
}: ProductListItem) => {
  const {
    id,
    imageUrl,
    name,
    foundAt,
    foundPlace,
    foundPlaceDetail,
    status,
    daysToDisposal,
  } = product;

  const [imageError, setImageError] = useState(false);
  const { mutate } = useItemDeleteMutation(id);
  const router = useRouter();
  const overlay = useOverlay();

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    overlay.open(({ isOpen, close }) => (
      <BaseModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          close();
          mutate();
        }}
      >
        <Text variant="p1">{name} 분실물을 삭제하시겠습니까?</Text>
      </BaseModal>
    ));
  };

  const handleEditClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    router.push(`${ROUTES.EDIT}/${id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const itemContent = (
    <>
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
            {showStatus && (
              <StatusBadge bgColor={statusColor[status]}>
                {STATUS[status]}
              </StatusBadge>
            )}
            <Text variant="H2">{name}</Text>
          </Flex>
          <Text variant="p2" color={color.gray200}>
            {foundAt && formatDateDot(foundAt)}
          </Text>
          <Text variant="p2">
            {foundPlace}
            {foundPlaceDetail ? ` / ${foundPlaceDetail}` : ''}
          </Text>
        </InfoSection>
      </Flex>
      {disposalMode && daysToDisposal !== undefined ? (
        <Flex direction="column" justify="center">
          <Text
            variant="p1"
            color={daysToDisposal <= 3 ? color.red : 'black'}
            style={{ textAlign: 'right' }}
          >
            폐기까지 D-{daysToDisposal}
          </Text>
          <Button
            styleType="PRIMARY"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onExtension?.(id);
            }}
            outlined
          >
            기간연장
          </Button>
        </Flex>
      ) : rightContent ? (
        <Flex direction="column" justify="center">
          {rightContent}
        </Flex>
      ) : (
        auth && (
          <Flex>
            <IconEdit onClick={handleEditClick} />
            <IconClose onClick={handleDelete} />
          </Flex>
        )
      )}
    </>
  );

  return (
    <StyledProductListItem size={size} href={`${ROUTES.FIND}/detail/${id}`}>
      {itemContent}
    </StyledProductListItem>
  );
};

const productSize = {
  small: '300px',
  medium: '450px',
  big: '100%',
};

interface StyledProductListItemProps {
  size: 'small' | 'medium' | 'big';
}

const StyledProductListItem = styled(Link)<StyledProductListItemProps>`
  width: ${({ size }) => productSize[size]};
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
  justify-content: space-between;
  height: 100%;
  flex: 1;
  min-width: 0;
  gap: 5px;
`;

const statusColor = {
  LOST: '#14C600',
  GIVEN: '#FFCC00',
  TO_BE_DISCARDED: '#FF883E',
  DISCARDED: '#FF2727',
};

export default ProductListItem;
