import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';

interface ProductListItem {
  size: 'small' | 'medium' | 'big';
  imageUrl: string;
  title: string;
  date: string;
  location: string;
}

const ProductListItem = ({
  size,
  imageUrl,
  title,
  date,
  location,
}: ProductListItem) => {
  return (
    <StyledProductListItem size={size}>
      <ProductImage src={imageUrl} alt="분실물 사진" width={98} height={98} />
      <Flex direction="column" justify="space-between">
        <Text variant="H2">{title}</Text>
        <Text variant="p2" color={color.gray200}>
          {date}
        </Text>
        <Text variant="p2">{location}</Text>
      </Flex>
    </StyledProductListItem>
  );
};

const productSize = {
  small: '300px',
  medium: '450px',
  big: '920px',
};

interface StyledProductListItemProps {
  size: 'small' | 'medium' | 'big';
}

const StyledProductListItem = styled.div<StyledProductListItemProps>`
  width: ${({ size }) => productSize[size]};
  flex-shrink: 0;
  padding: 12px;
  display: flex;
  gap: 20px;
  border: ${color.gray200} 1px solid;
  border-radius: 8px;
`;

const ProductImage = styled(Image)`
  border-radius: 12px;
`;

export default ProductListItem;
