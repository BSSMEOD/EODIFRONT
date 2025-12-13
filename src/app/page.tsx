'use client';

import styled from '@emotion/styled';
import MainRule from '@components/main/MainRule/MainRule';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import { useRouter } from 'next/navigation';
import color from '@styles/color';
import Flex from '@components/common/Flex/Flex';
import { ROUTES } from '@/constants/common/constants';
import React from 'react';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import HistoryLinkBox from '@components/common/HistoryLinkBox/HistoryLinkBox';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';

const MainPage = () => {
  const router = useRouter();
  const { authority, isLoggedIn } = useAuthStore();
  const { data: disposalProductListData } = { data: [] };
  const { data: recallProductListData } = { data: [] };
  const { data: productsCount } = {
    data: { disposalCount: 0, recallCount: 0 },
  };

  const isManager = authority === 'ADMIN';
  const isTeacher = authority === 'TEACHER';
  useEffect(() => {
    if (isTeacher) {
      router.replace(ROUTES.TEACHER);
    }
  }, [isLoggedIn, authority, router]);

  return (
    <StyledMainPage>
      <Flex gap={40} width="100%">
        {authority === 'ADMIN' ? (
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
          <Flex direction="column" gap={39} width="20%">
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
          productList={recallProductListData}
          href={ROUTES.RECALL}
        />
      )}
      <SmallProductList
        title="폐기 직전인 분실물"
        productList={disposalProductListData}
      />
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;
