'use client';

import React from 'react';
import styled from '@emotion/styled';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import FindDetailContent from '@components/findDetail/FindDetailContent/FindDetailContent';

interface ProductDetailPageProps {
  params: Promise<{
    id: number;
  }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { id } = React.use(params);
  const { data: disposalProductListData } = { data: [] };

  return (
    <StyledProductDetailPage>
      <FindDetailContent id={id} />
      <SmallProductList
        title="폐기 직전인 분실물"
        productList={disposalProductListData}
      />
    </StyledProductDetailPage>
  );
};

const StyledProductDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 92px;
  align-items: center;
  padding: 46px;
`;

export default ProductDetailPage;
