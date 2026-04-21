import DashboardRouteCard from '@components/teacher/DashboardRoute/DashboardRouteCard/DashboardRouteCard';
import { ROUTES } from '@/constants/common/constants';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import breakpoint from '@styles/breakpoint';
import useMobile from '@hooks/useMobile';

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
  const { isMobile } = useMobile();
  return (
    <StyledDashboard>
      <LeftSectionWrapper>
        <DashboardRouteCard
          title="상점요청 대기"
          count={pendingCount}
          onClick={!isMobile ? () => router.push(ROUTES.POINT) : undefined}
          variant="primary"
        />
      </LeftSectionWrapper>
      <RightSectionWrapper>
        <DashboardRouteCard
          title="상품 처리하기"
          count={logCount}
          onClick={!isMobile ? () => router.push(ROUTES.LOG) : undefined}
        />
        <DashboardRouteCard
          title="폐기 예정 물품"
          count={disposalCount}
          onClick={!isMobile ? () => router.push(ROUTES.DISPOSAL) : undefined}
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

  ${breakpoint.mobile} {
    flex-direction: column;
  }
`;

const LeftSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  ${breakpoint.mobile} {
    width: 100%;
  }
`;

const RightSectionWrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 16px;

  ${breakpoint.mobile} {
    width: 100%;
  }
`;
