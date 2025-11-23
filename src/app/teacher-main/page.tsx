'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import SmallProductList from '@components/common/ProductList/SmallProductList';
import DashboardRoute from '@components/teacher-main/DashboardRoute/DashboardRoute';

const TeacherMainPage = () => {
  const router = useRouter();
  const { data: unPointProductListData } = { data: [] };
  const { data: disposalProductListData } = { data: [] };
  const { data: logListData } = { data: [] };

  return (
    <StyledTeacherMainPage>
      <DashboardRoute
        pendingCount={unPointProductListData.length}
        logCount={logListData.length}
        disposalCount={disposalProductListData.length}
      />
      <SmallProductList
        title="상점 미지급 상태 분실물"
        productList={unPointProductListData}
        href={ROUTES.POINT}
      />
      <SmallProductList
        title="폐기 직전인 분실물"
        productList={disposalProductListData}
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
