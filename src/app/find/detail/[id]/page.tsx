'use client';

import React from 'react';
import styled from '@emotion/styled';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import FindDetailContent from '@components/findDetail/FindDetailContent/FindDetailContent';
import { useItemListQuery } from '@services/item/queries';
import Visible from '@components/common/Visible/Visible';

interface ProductDetailPageProps {
  params: Promise<{
    id: number;
  }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { id } = React.use(params);
  const { data: disposalProductListData } = useItemListQuery({
    status: ['TO_BE_DISCARDED'],
    size: 5,
  });

  return (
    <StyledProductDetailPage>
      <FindDetailContent id={id} />
      <Visible on="desktop">
        <SmallProductList
          title="폐기 직전인 분실물"
          productList={disposalProductListData?.content || []}
        />
      </Visible>
    </StyledProductDetailPage>
  );
};

const StyledProductDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 92px;
  align-items: center;
`;

export default ProductDetailPage;
