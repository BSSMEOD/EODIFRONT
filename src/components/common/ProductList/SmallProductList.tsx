import Flex from '@ui/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';
import Text from '@ui/Text/Text';
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
        {productList?.map((product) => (
          <ProductListItem
            key={`product-${product.id}`}
            product={product}
            size="small"
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default SmallProductList;
