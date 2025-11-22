'use client';

import styled from '@emotion/styled';
import MainRule from '@components/main/MainRule/MainRule';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button/Button';
import { useRouter } from 'next/navigation';
import color from '@styles/color';
import Flex from '@ui/Flex/Flex';
import { ROUTES } from '@/constants/common/constants';
import React from 'react';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import HistoryLinkBox from '@components/common/HistoryLinkBox/HistoryLinkBox';
import { useAuthStore } from '@/stores/useAuthStore';

const MainPage = () => {
  const router = useRouter();
  const { authority } = useAuthStore();
  const { data: disposalProductListData } = { data: [] };
  const { data: recallProductListData } = { data: [] };
  const { data: productsCount } = {
    data: { disposalCount: 0, recallCount: 0 },
  };

  const isManager = authority === 'MANAGER';

  return (
    <StyledMainPage>
      <Flex gap={24} width="100%">
        {authority === 'MANAGER' ? (
          <Flex direction="column" gap={20} width="30%">
            <HistoryLinkBox
              title="회수 신청 요청"
              count={productsCount.disposalCount}
              route={ROUTES.RECALL}
              height={176}
            />
            <HistoryLinkBox
              title="폐기 예정 물품"
              count={productsCount.recallCount}
              route={ROUTES.DISPOSAL}
              height={176}
            />
          </Flex>
        ) : (
          <Flex direction="column" gap={100} width="30%">
            <Text variant="D1">
              분실물 관리 서비스,
              <br />
              어디
            </Text>
            <Button
              styleType={'SECONDARY'}
              onClick={() => router.push(ROUTES.RULES)}
            >
              <Text variant="H4" color={color.white}>
                상벌점제 규정 확인하기
              </Text>
            </Button>
          </Flex>
        )}
        <MainRule canEdit={isManager} />
      </Flex>
      {isManager && (
        <SmallProductList
          title="회수 신청 요청이 있는 물품"
          productList={disposalProductListData}
          href={ROUTES.RECALL}
        />
      )}
      <SmallProductList
        title="폐기 직전인 분실물"
        productList={recallProductListData}
        href={isManager ? ROUTES.DISPOSAL : undefined}
      />
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: 0 auto;
  padding-top: 66px;
`;
