'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import IconWhiteArrow from '@package/icon/src/IconWhiteArrow';
import IconBlackArrow from '@package/icon/src/IconBlackArrow';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';

const ITEMS = [
  {
    id: 1,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
  {
    id: 2,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
  {
    id: 3,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
  {
    id: 4,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
  {
    id: 5,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
];

const TeacherMainPage = () => {
  const router = useRouter();
  return (
    <StyledTeacherMainPage>
      <StyledDashboard>
        <PointsSection onClick={() => router.push(ROUTES.POINT)}>
          <SortInnerSectionText>
            상점요청 대기
            <p css={font.D2}>3건</p>
          </SortInnerSectionText>
          <IconWhiteArrow width={40} height={40} />
        </PointsSection>
        <SortDashboardSections>
          <SectionItem onClick={() => router.push(ROUTES.LOG)}>
            <SortInnerSectionText>
              상품 처리하기
              <p css={font.D3}>3건</p>
            </SortInnerSectionText>
            <IconBlackArrow width={32} height={32}></IconBlackArrow>
          </SectionItem>
          <SectionItem onClick={() => router.push(ROUTES.DISPOSAL)}>
            <SortInnerSectionText>
              폐기 예정 물품
              <p css={font.D3}>3건</p>
            </SortInnerSectionText>
            <IconBlackArrow width={32} height={32}></IconBlackArrow>
          </SectionItem>
        </SortDashboardSections>
      </StyledDashboard>
      <UnderSectionItem>
        <SectionList>
          <SectionTitleText>상점 미지급 상태의 분실물</SectionTitleText>
          <SectionReadMore onClick={() => router.push(ROUTES.POINT)}>
            자세히보기 &gt;
          </SectionReadMore>
        </SectionList>
        <ScrollContainer>
          <ItemList>
            {ITEMS.map((item) => (
              <ProductListItem key={item.id} product={item} size="small" />
            ))}
          </ItemList>
        </ScrollContainer>
      </UnderSectionItem>
      <UnderSectionItem>
        <SectionList>
          <SectionTitleText>폐기 직전인 분실물</SectionTitleText>
          <SectionReadMore onClick={() => router.push(ROUTES.DISPOSAL)}>
            자세히보기 &gt;
          </SectionReadMore>
        </SectionList>
        <ScrollContainer>
          <ItemList>
            {ITEMS.map((item) => (
              <ProductListItem key={item.id} product={item} size="small" />
            ))}
          </ItemList>
        </ScrollContainer>
      </UnderSectionItem>
    </StyledTeacherMainPage>
  );
};

export default TeacherMainPage;
const StyledTeacherMainPage = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
  flex-direction: column;
`;

const StyledDashboard = styled.div`
  display: flex;
  height: 50%;
  gap: 8px;
  flex-direction: row;
`;
const PointsSection = styled.div`
  width: 30%;
  padding: 20px 16px;
  background-color: ${color.primary};
  font: ${font.H1};
  color: ${color.white};
  display: flex;
  border-radius: 8px;
  justify-content: space-between;
`;

const SortDashboardSections = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 8px;
`;

const SectionItem = styled.div`
  background-color: ${color.white};
  border-radius: 8px;
  padding: 20px 16px;
  justify-content: space-between;
  display: flex;
  border: 1px solid ${color.gray200};
  font: ${font.H1};
  color: ${color.black};
`;

const SortInnerSectionText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`;
const SectionTitleText = styled.p`
  ${font.H2};
  color: ${color.black};
`;

const SectionReadMore = styled.p`
  ${font.p2};
  color: ${color.gray300};
`;

const SectionList = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  align-items: flex-end;
`;

const UnderSectionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: none;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
