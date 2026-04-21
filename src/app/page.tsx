'use client';

import styled from '@emotion/styled';
import breakpoint from '@styles/breakpoint';
import MainRule from '@components/main/MainRule/MainRule';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import { useRouter } from 'next/navigation';
import Flex from '@components/common/Flex/Flex';
import { ROUTES } from '@/constants/common/constants';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import BigProductList from '@components/common/ProductList/BigProductList';
import HistoryLinkBox from '@components/common/HistoryLinkBox/HistoryLinkBox';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import {
  useClaimItemCountQuery,
  useClaimItemListQuery,
  useItemListQuery,
} from '@services/item/queries';
import useMobile from '@hooks/useMobile';

const MOBILE_DISPOSAL_LIMIT = 3;

const MainPage = () => {
  const router = useRouter();
  const { authority, isLoggedIn } = useAuthStore();
  const isMobile = useMobile();
  const { data: disposalProductListData } = useItemListQuery({
    status: ['TO_BE_DISCARDED'],
    size: 5,
  });
  const { data: recallProductListData } = useClaimItemListQuery();
  const { data: claimItemCountData } = useClaimItemCountQuery();

  const isManager = authority === 'ADMIN';
  const isTeacher = authority === 'TEACHER';
  useEffect(() => {
    if (isTeacher) {
      router.replace(ROUTES.TEACHER);
    }
  }, [isLoggedIn, authority, router]);

  const disposalList = disposalProductListData?.content || [];

  return (
    <StyledMainPage>
      <Flex gap={40} width="100%">
        <LeftPanel>
          {authority === 'ADMIN' ? (
            <Flex direction="column" gap={20}>
              <HistoryLinkBox
                title="회수 신청 요청"
                count={claimItemCountData?.count || 0}
                route={ROUTES.RECALL}
                height={176}
              />
              <HistoryLinkBox
                title="폐기 예정 물품"
                count={disposalProductListData?.totalElements || 0}
                route={ROUTES.ADMIN_DISPOSAL}
                height={176}
              />
            </Flex>
          ) : (
            <Flex direction="column" gap={39}>
              <Text variant="D1">
                분실물 관리 서비스,
                <br />
                어디
              </Text>
              <Button
                styleType="SECONDARY"
                onClick={() => router.push(ROUTES.RULES)}
                size="big"
              >
                상벌점제 규정 확인하기
              </Button>
            </Flex>
          )}
        </LeftPanel>
        <MainRule canEdit={isManager} />
      </Flex>
      {isManager &&
        (isMobile ? (
          <BigProductList
            title="회수 신청 요청이 있는 물품"
            productList={
              recallProductListData?.items.slice(0, MOBILE_DISPOSAL_LIMIT) || []
            }
            href={ROUTES.RECALL}
          />
        ) : (
          <SmallProductList
            title="회수 신청 요청이 있는 물품"
            productList={recallProductListData?.items || []}
            href={ROUTES.RECALL}
          />
        ))}
      {isMobile ? (
        <BigProductList
          title="폐기 직전인 분실물"
          productList={disposalList.slice(0, MOBILE_DISPOSAL_LIMIT)}
          href={isManager ? ROUTES.ADMIN_DISPOSAL : undefined}
        />
      ) : (
        <SmallProductList
          title="폐기 직전인 분실물"
          productList={disposalList}
          href={isManager ? ROUTES.ADMIN_DISPOSAL : undefined}
        />
      )}
    </StyledMainPage>
  );
};

export default MainPage;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const LeftPanel = styled.div`
  width: 260px;
  ${breakpoint.mobile} {
    display: none;
  }
`;
