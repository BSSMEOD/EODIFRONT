import Flex from '@ui/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';

const SmallProductList = ({ productList }: ProductListProps) => {
  return (
    <Flex width="100%" gap={20} style={{ overflowX: 'scroll' }}>
      {productList.map((product) => (
        <ProductListItem
          key={`product-${product.id}`}
          product={product}
          size="small"
        />
      ))}
    </Flex>
  );
};

export default SmallProductList;
