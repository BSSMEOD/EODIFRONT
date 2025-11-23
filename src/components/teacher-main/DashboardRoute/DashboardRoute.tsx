import DashboardRouteCard from '@components/teacher-main/DashboardRoute/DashboardRouteCard/DashboardRouteCard';
import { ROUTES } from '@/constants/common/constants';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

interface DashboardRouteProps {
  pendingCount: number;
  logCount: number;
  disposalCount: number;
}

const DashboardRoute = ({
  pendingCount,
  logCount,
  disposalCount,
}: DashboardRouteProps) => {
  const router = useRouter();
  return (
    <StyledDashboard>
      <DashboardRouteCard
        title="상점요청 대기"
        count={pendingCount}
        onClick={() => router.push(ROUTES.POINT)}
        variant="primary"
      />
      <RightSectionWrapper>
        <DashboardRouteCard
          title="상품 처리하기"
          count={logCount}
          onClick={() => router.push(ROUTES.LOG)}
        />
        <DashboardRouteCard
          title="폐기 예정 물품"
          count={disposalCount}
          onClick={() => router.push(ROUTES.DISPOSAL)}
        />
      </RightSectionWrapper>
    </StyledDashboard>
  );
};

export default DashboardRoute;

const StyledDashboard = styled.div`
  display: flex;
  height: fit-content;
  gap: 16px;
  flex-direction: row;
`;

const RightSectionWrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 16px;
`;
