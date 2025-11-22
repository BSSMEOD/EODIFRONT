import DormitoryCommitteeRule from '@components/rules/CommitteeRule/DormitoryCommitteeRule/DormitoryCommitteeRule';
import LeadingCommitteeRule from '@components/rules/CommitteeRule/LeadingCommitteeRule/LeadingCommitteeRule';
import styled from '@emotion/styled';

interface CommitteeRuleProps {
  id?: string;
}

const CommitteeRule = ({ id }: CommitteeRuleProps) => {
  return (
    <StyledCommitteeRules id={id}>
      <DormitoryCommitteeRule />
      <LeadingCommitteeRule />
    </StyledCommitteeRules>
  );
};

export default CommitteeRule;

const StyledCommitteeRules = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 24px;
`;
