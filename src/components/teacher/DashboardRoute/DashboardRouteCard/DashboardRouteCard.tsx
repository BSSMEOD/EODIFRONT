import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import IconArrow from '@/icons/src/IconArrow';

interface DashboardStatCardProps {
  title: string;
  count: number;
  onClick?: () => void;
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
    <StyledDashboardRouteCard
      onClick={onClick}
      isPrimary={isPrimary}
      clickable={!!onClick}
    >
      <TextSection>
        {title}
        <CountText isPrimary={isPrimary}>{count}건</CountText>
      </TextSection>
      {!!onClick && (
        <IconArrow
          width={40}
          height={40}
          color={isPrimary ? color.white : color.black}
        />
      )}
    </StyledDashboardRouteCard>
  );
};

export default DashboardRouteCard;

const StyledDashboardRouteCard = styled.div<{
  isPrimary: boolean;
  clickable: boolean;
}>`
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  border-radius: 8px;
  background-color: ${color.white};
  color: ${color.black};
  border: 1px solid ${color.gray200};
  flex-grow: 1;

  ${({ clickable }) => clickable && `cursor: pointer;`}

  ${({ isPrimary }) =>
    isPrimary &&
    `
     background-color: ${color.primary300};
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
