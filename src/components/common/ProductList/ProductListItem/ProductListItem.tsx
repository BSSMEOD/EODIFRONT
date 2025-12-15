import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import { ROUTES } from '@/constants/common/constants';
import { Item } from '@/types/item/client';
import Link from 'next/link';
import { STATUS } from '@/constants/item/constant';
import font from '@styles/font';
import { IconClose, IconEdit } from '@/icons';
import { formatDateDot } from '@utils/formatDate';

interface ProductListItem {
  product: Item & { daysToDisposal?: number };
  size: 'small' | 'medium' | 'big';
  showStatus?: boolean;
  auth?: boolean;
  disposalMode?: boolean;
  onDisposal?: (id: number) => void;
  onExtension?: (id: number) => void;
}

const ProductListItem = ({
  product,
  size,
  showStatus = false,
  auth = false,
  disposalMode = false,
  onDisposal,
  onExtension,
}: ProductListItem) => {
  const { id, imageUrl, name, foundAt, foundPlace, status, daysToDisposal } =
    product;

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    const isConfirm = confirm(`${name} 분실물을 삭제하시겠습니까?`);
  };

  const itemContent = (
    <>
      <Flex direction="row" gap={20} align="center">
        <ProductImage src={imageUrl} alt="분실물 사진" width={98} height={98} />
        <Flex direction="column" justify="space-between" height="100%">
          <Flex direction="row" gap={5} align="center">
            {showStatus && <Status status={status}>{STATUS[status]}</Status>}
            <Text variant="H2">{name}</Text>
          </Flex>
          <Text variant="p2" color={color.gray200}>
            {foundAt && formatDateDot(foundAt)}
          </Text>
          <Text variant="p2">{foundPlace}</Text>
        </Flex>
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
          <Flex gap={4}>
            <Button
              styleType="GHOST"
              size="small"
              onClick={() => onDisposal?.(id)}
            >
              폐기처리
            </Button>
            <Button
              styleType="GHOST"
              size="small"
              onClick={() => onExtension?.(id)}
            >
              기간연장
            </Button>
          </Flex>
        </Flex>
      ) : (
        auth && (
          <Flex>
            <Link href={`/edit/${id}`}>
              <IconEdit />
            </Link>
            <IconClose onClick={handleDelete} />
          </Flex>
        )
      )}
    </>
  );

  return disposalMode ? (
    <StyledProductListDiv size={size}>{itemContent}</StyledProductListDiv>
  ) : (
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

const StyledProductListDiv = styled.div<StyledProductListItemProps>`
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
  object-fit: contain;
  width: 98px;
  height: 98px;
  background: ${color.gray100};
`;

const statusColor = {
  LOST: '#14C600',
  FOUND: '#FFCC00',
  TO_BE_DISCARDED: '#FF883E',
  DISCARDED: '#FF2727',
};

const Status = styled.div<{ status: keyof typeof STATUS }>`
  ${font.p3};
  background: ${({ status }) => statusColor[status]};
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
`;

export default ProductListItem;
