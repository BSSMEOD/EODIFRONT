import type { HTMLAttributes } from 'react';
import color from '@styles/color';
import font from '@styles/font';
import styled from '@emotion/styled';

interface NavItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const NavItem = (props: NavItemProps) => {
  const { active = false, children, ...restProps } = props;

  return (
    <StyledNavItem $active={active} {...restProps}>
      {children}
    </StyledNavItem>
  );
};

const StyledNavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  font: ${font.p2};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ $active }) => ($active ? color.gray100 : color.white)};
  color: ${color.black};

  &:hover {
    background-color: ${color.gray100};
  }
`;
