import Flex from '@components/common/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';

const BigProductList = ({ productList, auth = false }: ProductListProps) => {
  return (
    <Flex direction="column" gap={20} width="100%">
      {productList?.map((product) => (
        <ProductListItem
          key={`product-${product.id}`}
          product={product}
          size="big"
          showStatus={true}
          auth={auth}
        />
      ))}
    </Flex>
  );
};

export default BigProductList;
