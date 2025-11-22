'use client';

import React from 'react';
import styled from '@emotion/styled';
import Flex from '@ui/Flex/Flex';
import Image from 'next/image';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button/Button';
import color from '@styles/color';
import ProductListItem from '@components/common/ProductListItem/ProductListItem';
import { Divider } from '@components/common/Divider/Divider';

const StyledProductDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 92px;
  align-items: center;
  padding: 46px;
`;

const ProductImage = styled(Image)`
  border-radius: 12px;
`;

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { id } = React.use(params);
  return (
    <StyledProductDetailPage>
      <Flex direction="row" gap={50} align="flex-end">
        <ProductImage width={400} height={400} src="" alt="상품 이미지" />
        <Flex direction="column" gap={20} width={470}>
          <Flex direction="column" gap={20}>
            <Text variant="H2">테무 안경</Text>
            <Flex direction="row" gap={20} align="center">
              <Text variant="p1">최초 발견 일시</Text>
              <Divider
                orientation="vertical"
                length={16}
                color={color.gray400}
              />
              <Text variant="p1">2025년 6월 19일</Text>
            </Flex>
            <Flex direction="row" gap={20} align="center">
              <Text variant="p1">최초 발견 장소</Text>
              <Divider
                orientation="vertical"
                length={16}
                color={color.gray400}
              />
              <Text variant="p1">기타/운동장</Text>
            </Flex>
          </Flex>
          <Button styleType="PRIMARY" height={50}>
            <Text variant="H3" color={color.white}>
              내 물건이에요!
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" gap={13} width={920}>
        <Text variant="H1">폐기 직전인 분실물</Text>
        <Flex width="100%" gap={20} style={{ overflowX: 'scroll' }}>
          <ProductListItem
            size="small"
            imageUrl={''}
            title={''}
            date={''}
            location={''}
          />
        </Flex>
      </Flex>
    </StyledProductDetailPage>
  );
};

export default ProductDetailPage;
