import Flex from '@components/common/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';

interface BigProductListProps extends ProductListProps {
  disposalMode?: boolean;
  onDisposal?: (id: number) => void;
  onExtension?: (id: number) => void;
}

const BigProductList = ({
  productList,
  auth = false,
  disposalMode = false,
  onDisposal,
  onExtension,
}: BigProductListProps) => {
  return (
    <Flex direction="column" gap={20} width="100%">
      {productList?.map((product) => (
        <ProductListItem
          key={`product-${product.id}`}
          product={product}
          size="big"
          showStatus={!disposalMode}
          auth={auth}
          disposalMode={disposalMode}
          onDisposal={onDisposal}
          onExtension={onExtension}
        />
      ))}
    </Flex>
  );
};

export default BigProductList;
