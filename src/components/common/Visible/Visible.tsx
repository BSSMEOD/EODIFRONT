import styled from '@emotion/styled';
import breakpoint from '@styles/breakpoint';

interface VisibleProps {
  on: 'mobile' | 'desktop';
  children: React.ReactNode;
}

const Visible = ({ on, children }: VisibleProps) => {
  return <StyledVisible on={on}>{children}</StyledVisible>;
};

const StyledVisible = styled.div<{ on: 'mobile' | 'desktop' }>`
  ${({ on }) =>
    on === 'mobile'
      ? `
    display: none;
    ${breakpoint.mobile} { display: contents; }
  `
      : `
    display: contents;
    ${breakpoint.mobile} { display: none; }
  `}
`;

export default Visible;
