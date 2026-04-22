import Flex from '@components/common/Flex/Flex';
import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import { ProductListProps } from './ProductList.types';
import Text from '@components/common/Text/Text';
import Link from 'next/link';
import color from '@styles/color';

type BigProductListProps = ProductListProps & {
  showStatus?: boolean;
} & (
    | { disposalMode?: false; onExtension?: never }
    | { disposalMode: true; onExtension: (id: number) => void }
  );

const BigProductList = ({
  title,
  productList,
  href,
  auth = false,
  disposalMode = false,
  onExtension,
  showStatus = false,
}: BigProductListProps) => {
  return (
    <Flex direction="column" gap={13} width="100%">
      {title && (
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
      )}
      <Flex direction="column" gap={20} width="100%">
        {productList?.map((product) => (
          <ProductListItem
            key={`product-${product.id}`}
            product={product}
            size="big"
            showStatus={showStatus}
            auth={auth}
            disposalMode={disposalMode}
            onExtension={onExtension}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default BigProductList;
