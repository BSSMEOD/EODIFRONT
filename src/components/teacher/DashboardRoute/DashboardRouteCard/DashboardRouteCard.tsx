import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import IconWhiteArrow from '@/icons/src/IconWhiteArrow';
import IconBlackArrow from '@/icons/src/IconBlackArrow';

interface DashboardStatCardProps {
  title: string;
  count: number;
  onClick: () => void;
  variant?: 'primary' | 'default';
}

const DashboardRouteCard = ({
  title,
  count,
  onClick,
  variant = 'default',
}: DashboardStatCardProps) => {
  const isPrimary = variant === 'primary';

  return (
    <StyledDashboardRouteCard onClick={onClick} isPrimary={isPrimary}>
      <TextSection>
        {title}
        <CountText isPrimary={isPrimary}>{count}건</CountText>
      </TextSection>
      {isPrimary ? (
        <IconWhiteArrow width={40} height={40} />
      ) : (
        <IconBlackArrow width={32} height={32} />
      )}
    </StyledDashboardRouteCard>
  );
};

export default DashboardRouteCard;

const StyledDashboardRouteCard = styled.div<{ isPrimary: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${color.white};
  color: ${color.black};
  border: 1px solid ${color.gray200};

  ${({ isPrimary }) =>
    isPrimary &&
    `
     height: 100%;
     background-color: ${color.primary300};
     width: 30%; 
     color: ${color.white};
     border:none;
  `}
  ${font.H1}
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`;

const CountText = styled.p<{ isPrimary: boolean }>`
  ${({ isPrimary }) => (isPrimary ? font.D2 : font.D3)}
`;
