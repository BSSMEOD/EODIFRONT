import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { ROUTES } from '@/constants/common/constants';
import { Item } from '@/types/item/client';
import Link from 'next/link';
import { STATUS } from '@/constants/item/constant';
import font from '@styles/font';
import { IconClose, IconEdit } from '@/icons';

interface ProductListItem {
  product: Item;
  size: 'small' | 'medium' | 'big';
  showStatus?: boolean;
  auth?: boolean;
}

const ProductListItem = ({
  product,
  size,
  showStatus = false,
  auth = false,
}: ProductListItem) => {
  const { id, imageUrl, name, foundAt, foundPlace, status } = product;

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    const isConfirm = confirm(`${name} 분실물을 삭제하시겠습니까?`);
  };

  return (
    <StyledProductListItem size={size} href={`${ROUTES.FIND}/detail/${id}`}>
      <Flex direction="row" gap={20} align="center">
        <ProductImage src={imageUrl} alt="분실물 사진" width={98} height={98} />
        <Flex direction="column" justify="space-between" height="100%">
          <Flex direction="row" gap={5} align="center">
            {showStatus && <Status status={status}>{STATUS[status]}</Status>}
            <Text variant="H2">{name}</Text>
          </Flex>
          <Text variant="p2" color={color.gray200}>
            {foundAt}
          </Text>
          <Text variant="p2">{foundPlace}</Text>
        </Flex>
      </Flex>
      {auth && (
        <Flex>
          <Link href={`/edit/${id}`}>
            <IconEdit />
          </Link>
          <IconClose onClick={handleDelete} />
        </Flex>
      )}
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
