import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'standardApplyingPont', title: '상벌점제 적용 기준' },
  { id: 'rewardRule', title: '상점 기준' },
  { id: 'penaltyRule', title: '벌점 기준' },
  { id: 'committeeRule', title: '즉시 선도위원회 회부' },
];

const OBSERVER_OPTIONS = {
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0,
};

const RuleNav = () => {
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersect,
      OBSERVER_OPTIONS
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Title>상벌점제 규정</Title>
      <NavList>
        {NAV_ITEMS.map(({ id, title }) => (
          <NavItem key={id} isActive={activeSection === id}>
            <NavLink href={`#${id}`} onClick={(e) => handleClick(e, id)}>
              {title}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Container>
  );
};

export default RuleNav;

const Container = styled.nav`
  position: sticky;
  top: 20px;
  width: 200px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: flex-start;
`;

const Title = styled.p`
  ${font.H1}
  margin: 0;
  color: ${color.black};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.li<{ isActive: boolean }>`
  ${({ isActive }) => (isActive ? font.H4 : font.p2)}
  height: 32px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  color: ${({ isActive }) => (isActive ? color.black : color.gray500)};

  &:hover {
    color: ${color.black};
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
