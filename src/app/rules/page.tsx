'use client';
import RuleNav from '@components/rules/RuleNav/RuleNav';
import StandardApplyingPoint from '@components/rules/StandardApplyingPoint/StandardApplyingPoint';
import styled from '@emotion/styled';
import CommitteeRule from '@components/rules/CommitteeRule/CommitteeRule';
import RewardRule from '@components/rules/RewardRule/RewardRule';
import PenaltyRule from '@components/rules/PenaltyRule/PenaltyRule';

const RulePage = () => {
  return (
    <StyledRulePage>
      <RuleNav />
      <SortRules>
        <StandardApplyingPoint id="standardApplyingPoint" />
        <RewardRule id="rewardRule" />
        <PenaltyRule id="penaltyRule" />
        <CommitteeRule id="committeeRule" />
      </SortRules>
    </StyledRulePage>
  );
};

export default RulePage;

const StyledRulePage = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SortRules = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
