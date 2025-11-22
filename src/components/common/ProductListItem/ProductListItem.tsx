import styled from '@emotion/styled';
import color from '@styles/color';
import Image from 'next/image';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';

interface ProductListItem {
  size: 'small' | 'medium' | 'big';
}

const ProductListItem = ({ size }: ProductListItem) => {
  return (
    <StyledProductListItem>
      <ProductImage src={''} alt="분실물 사진" />
      <Flex direction="column" justify="space-between">
        <Text variant="H2">긱시크 안경</Text>
        <Text variant="p2" color={color.gray200}>
          2025. 06. 19.
        </Text>
        <Text variant="p2">기타 / 운동장</Text>
      </Flex>
    </StyledProductListItem>
  );
};

const StyledProductListItem = styled.div`
  width: 300px;
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
