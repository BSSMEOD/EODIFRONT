import styled from '@emotion/styled';
import font from '@styles/font';
import ProductListItem from '@components/common/ProductListItem/ProductListItem';

const LOST_ITEMS = [
  {
    id: 1,
    imageUrl: '/images/airpods.png',
    title: '에어팟 3세대',
    date: '2025-08-05',
    location: '본관 1층',
  },
];

const LostItemVergeDiscard = () => {
  return (
    <StyledLostItemVergeDiscard>
      <Title>폐기 직전인 분실물</Title>
      <ScrollContainer>
        <LostItemList>
          {LOST_ITEMS.map((item) => (
            <ProductListItem
              key={item.id}
              size="small"
              imageUrl={item.imageUrl}
              title={item.title}
              date={item.date}
              location={item.location}
            />
          ))}
        </LostItemList>
      </ScrollContainer>
    </StyledLostItemVergeDiscard>
  );
};

export default LostItemVergeDiscard;

const StyledLostItemVergeDiscard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.p`
  ${font.H1}
`;

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: none;
`;

const LostItemList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
