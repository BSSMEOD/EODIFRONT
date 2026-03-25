import Flex from '@components/common/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';
import Text from '@components/common/Text/Text';
import Link from 'next/link';
import color from '@styles/color';

const SmallProductList = ({ title, productList, href }: ProductListProps) => {
  return (
    <Flex direction="column" gap={13} width="100%">
      <Flex direction="row" align="center" gap={20}>
        <Text variant="H1">{title}</Text>
        {href && (
          <Link href={href}>
            <Text variant="p2" color={color.gray400}>
              자세히보기 &gt;
            </Text>
          </Link>
        )}
      </Flex>
      <Flex width="100%" gap={20} style={{ overflowX: 'auto' }}>
        {productList.length > 0 ? (
          productList.map((product) => (
            <ProductListItem
              key={`product-${product.id}`}
              product={product}
              size="small"
            />
          ))
        ) : (
          <Text width="100%" textAlign="center" color={color.gray500}>
            분실물 목록이 없습니다.
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default SmallProductList;
