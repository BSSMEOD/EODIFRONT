'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import DashboardRoute from '@components/teacher/DashboardRoute/DashboardRoute';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUnpaidRewardsQuery } from '@/services/point/queries';
import { useImminentDisposalQuery } from '@/services/disposal/queries';
import { useLogListQuery } from '@/services/log/queries';

const TeacherMainPage = () => {
  const router = useRouter();
  const { authority, isLoggedIn } = useAuthStore();
  const isTeacher = authority === 'TEACHER';
  const { data: unPointProductListData = [] } = useUnpaidRewardsQuery();
  const { data: disposalProductListData = [] } = useImminentDisposalQuery();

  const { data: logListData } = useLogListQuery({
    page: 1,
    size: 100,
    status: 'FOUND',
  });

  useEffect(() => {
    if (isLoggedIn && !isTeacher) {
      router.replace(ROUTES.MAIN);
    }
  }, [isLoggedIn, isTeacher, router]);

  return (
    <StyledTeacherMainPage>
      <DashboardRoute
        pendingCount={unPointProductListData?.length || 0}
        logCount={logListData?.content?.length || 0}
        disposalCount={disposalProductListData?.length || 0}
      />
      <SmallProductList
        title="상점 미지급 상태 분실물"
        productList={unPointProductListData || []}
        href={ROUTES.POINT}
      />
      <SmallProductList
        title="폐기 직전인 분실물"
        productList={disposalProductListData || []}
        href={ROUTES.DISPOSAL}
      />
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
