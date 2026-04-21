'use client';

import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import DashboardRoute from '@components/teacher/DashboardRoute/DashboardRoute';
import { useUnpaidRewardsQuery } from '@/services/point/queries';
import {
  useImminentDisposalQuery,
  useDisposalItemsCountQuery,
} from '@/services/disposal/queries';
import { useLogListQuery } from '@/services/log/queries';
import { useRequireRole } from '@hooks/useRequireRole';
import useMobile from '@hooks/useMobile';
import BigProductList from '@components/common/ProductList/BigProductList';

const TeacherMainPage = () => {
  useRequireRole('TEACHER');

  const { data: unPointProductListData } = useUnpaidRewardsQuery();
  const { data: disposalProductListData = [] } = useImminentDisposalQuery();
  const { data: disposalCount = 0 } = useDisposalItemsCountQuery();

  const { data: logListData } = useLogListQuery({
    page: 1,
    size: 100,
    approvedAt: 'true',
  });
  const { isMobile } = useMobile();

  return (
    <StyledTeacherMainPage>
      <DashboardRoute
        pendingCount={unPointProductListData?.totalElements || 0}
        logCount={logListData?.content?.length || 0}
        disposalCount={disposalCount}
      />
      {isMobile ? (
        <>
          <BigProductList
            title="상점 미지급 상태 분실물"
            productList={unPointProductListData?.content || []}
            href={ROUTES.POINT}
          />
          <BigProductList
            title="폐기 직전인 분실물"
            productList={disposalProductListData || []}
            href={ROUTES.DISPOSAL}
          />
        </>
      ) : (
        <>
          <SmallProductList
            title="상점 미지급 상태 분실물"
            productList={unPointProductListData?.content || []}
            href={ROUTES.POINT}
          />
          <SmallProductList
            title="폐기 직전인 분실물"
            productList={disposalProductListData || []}
            href={ROUTES.DISPOSAL}
          />
        </>
      )}
    </StyledTeacherMainPage>
  );
};

export default TeacherMainPage;

const StyledTeacherMainPage = styled.div`
  display: flex;
  gap: 32px;
  height: 100%;
  flex-direction: column;
`;
