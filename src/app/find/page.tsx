'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import color from '@styles/color';
import Dropdown from '@components/common/Dropdown/Dropdown';
import SearchInput from '@components/common/Input/SearchInput';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import { Item } from '@/types/item/client';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import IconMinus from '@/icons/src/IconMinus';
import Pagination from '@components/common/Pagination/Pagination';

const FindPage = () => {
  const allItems: Item[] = [
    {
      id: 1,
      title: '긱시크 안경',
      date: '2025.06.19.',
      location: '야외 - 창의관 앞 벤치',
      imageUrl: '/images/glasses.jpg',
      status: 'LOST',
    },
    {
      id: 2,
      title: '무선 이어폰 (버즈2)',
      date: '2025.06.19.',
      location: 'SRC 3층 남자기숙사 중앙홀',
      imageUrl: '/images/earbuds.jpg',
      status: 'LOST',
    },
    {
      id: 3,
      title: '검정 우산',
      date: '2025.06.19.',
      location: 'SRC 4층 맨 끝 비상계단',
      imageUrl: '/images/umbrella.jpg',
      status: 'LOST',
    },
    {
      id: 4,
      title: '아이폰 충전케이블',
      date: '2025.06.18.',
      location: '본관 3층 컴퓨터실',
      imageUrl: '/images/cable.jpg',
      status: 'LOST',
    },
    {
      id: 5,
      title: '검은색 지갑',
      date: '2025.06.18.',
      location: '체육관 로비',
      imageUrl: '/images/wallet.jpg',
      status: 'LOST',
    },
    {
      id: 6,
      title: '파란색 볼펜',
      date: '2025.06.17.',
      location: '별관 2층 강의실',
      imageUrl: '/images/pen.jpg',
      status: 'LOST',
    },
    {
      id: 7,
      title: '하얀색 마스크',
      date: '2025.06.17.',
      location: '기숙사 A동 로비',
      imageUrl: '/images/mask.jpg',
      status: 'LOST',
    },
    {
      id: 8,
      title: '스타벅스 텀블러',
      date: '2025.06.16.',
      location: '창의관 카페테리아',
      imageUrl: '/images/tumbler.jpg',
      status: 'LOST',
    },
    {
      id: 9,
      title: '에어팟 케이스',
      date: '2025.06.16.',
      location: '본관 1층 로비',
      imageUrl: '/images/airpods-case.jpg',
      status: 'LOST',
    },
    {
      id: 10,
      title: '회색 후드티',
      date: '2025.06.15.',
      location: 'SRC 5층 열람실',
      imageUrl: '/images/hoodie.jpg',
      status: 'LOST',
    },
    {
      id: 11,
      title: '노란색 형광펜',
      date: '2025.06.15.',
      location: '도서관 2층',
      imageUrl: '/images/highlighter.jpg',
      status: 'LOST',
    },
    {
      id: 12,
      title: '키링',
      date: '2025.06.14.',
      location: '별관 1층 엘리베이터 앞',
      imageUrl: '/images/keyring.jpg',
      status: 'LOST',
    },
    {
      id: 13,
      title: '운동화',
      date: '2025.06.14.',
      location: '체육관 탈의실',
      imageUrl: '/images/sneakers.jpg',
      status: 'LOST',
    },
    {
      id: 14,
      title: '학생증',
      date: '2025.06.13.',
      location: '본관 식당',
      imageUrl: '/images/student-id.jpg',
      status: 'LOST',
    },
    {
      id: 15,
      title: '물병',
      date: '2025.06.13.',
      location: '운동장 벤치',
      imageUrl: '/images/bottle.jpg',
      status: 'LOST',
    },
    {
      id: 16,
      title: '휴대폰 케이스',
      date: '2025.06.12.',
      location: 'SRC 1층 편의점',
      imageUrl: '/images/phone-case.jpg',
      status: 'LOST',
    },
    {
      id: 17,
      title: '교복 넥타이',
      date: '2025.06.12.',
      location: '창의관 2층 화장실',
      imageUrl: '/images/necktie.jpg',
      status: 'LOST',
    },
    {
      id: 18,
      title: '노트북 파우치',
      date: '2025.06.11.',
      location: '도서관 1층 스터디룸',
      imageUrl: '/images/laptop-pouch.jpg',
      status: 'LOST',
    },
    {
      id: 19,
      title: '은색 반지',
      date: '2025.06.11.',
      location: '체육관 샤워실',
      imageUrl: '/images/ring.jpg',
      status: 'LOST',
    },
    {
      id: 20,
      title: '빨간색 우산',
      date: '2025.06.10.',
      location: '본관 현관',
      imageUrl: '/images/red-umbrella.jpg',
      status: 'LOST',
    },
    {
      id: 21,
      title: '무선 마우스',
      date: '2025.06.10.',
      location: '별관 3층 컴퓨터실',
      imageUrl: '/images/mouse.jpg',
      status: 'LOST',
    },
    {
      id: 22,
      title: '검은색 모자',
      date: '2025.06.09.',
      location: '기숙사 B동 식당',
      imageUrl: '/images/cap.jpg',
      status: 'LOST',
    },
    {
      id: 23,
      title: 'USB 메모리',
      date: '2025.06.09.',
      location: 'SRC 컴퓨터실',
      imageUrl: '/images/usb.jpg',
      status: 'LOST',
    },
    {
      id: 24,
      title: '파일철',
      date: '2025.06.08.',
      location: '창의관 강의실',
      imageUrl: '/images/binder.jpg',
      status: 'LOST',
    },
    {
      id: 25,
      title: '손목시계',
      date: '2025.06.08.',
      location: '체육관',
      imageUrl: '/images/watch.jpg',
      status: 'LOST',
    },
    {
      id: 26,
      title: '교재',
      date: '2025.06.07.',
      location: '도서관 3층',
      imageUrl: '/images/textbook.jpg',
      status: 'LOST',
    },
    {
      id: 27,
      title: '핸드크림',
      date: '2025.06.07.',
      location: '본관 2층 화장실',
      imageUrl: '/images/hand-cream.jpg',
      status: 'LOST',
    },
    {
      id: 28,
      title: '체육복 하의',
      date: '2025.06.06.',
      location: '체육관 라커룸',
      imageUrl: '/images/gym-pants.jpg',
      status: 'LOST',
    },
    {
      id: 29,
      title: '계산기',
      date: '2025.06.06.',
      location: '별관 수학교실',
      imageUrl: '/images/calculator.jpg',
      status: 'LOST',
    },
    {
      id: 30,
      title: '안경 케이스',
      date: '2025.06.05.',
      location: 'SRC 도서관',
      imageUrl: '/images/glasses-case.jpg',
      status: 'LOST',
    },
    {
      id: 31,
      title: '이어폰',
      date: '2025.06.05.',
      location: '창의관 1층 로비',
      imageUrl: '/images/earphones.jpg',
      status: 'LOST',
    },
    {
      id: 32,
      title: '파란색 필통',
      date: '2025.06.04.',
      location: '본관 4층 강의실',
      imageUrl: '/images/pencil-case.jpg',
      status: 'LOST',
    },
    {
      id: 33,
      title: '휴대폰 거치대',
      date: '2025.06.04.',
      location: '기숙사 A동 휴게실',
      imageUrl: '/images/phone-stand.jpg',
      status: 'LOST',
    },
    {
      id: 34,
      title: '운동 타월',
      date: '2025.06.03.',
      location: '체육관 벤치',
      imageUrl: '/images/towel.jpg',
      status: 'LOST',
    },
    {
      id: 35,
      title: '도시락통',
      date: '2025.06.03.',
      location: 'SRC 식당',
      imageUrl: '/images/lunchbox.jpg',
      status: 'LOST',
    },
    {
      id: 36,
      title: '카드지갑',
      date: '2025.06.02.',
      location: '별관 엘리베이터',
      imageUrl: '/images/card-wallet.jpg',
      status: 'LOST',
    },
    {
      id: 37,
      title: '립밤',
      date: '2025.06.02.',
      location: '창의관 화장실',
      imageUrl: '/images/lip-balm.jpg',
      status: 'LOST',
    },
    {
      id: 38,
      title: '흰색 양말',
      date: '2025.06.01.',
      location: '기숙사 B동 세탁실',
      imageUrl: '/images/socks.jpg',
      status: 'LOST',
    },
    {
      id: 39,
      title: '스마트워치',
      date: '2025.06.01.',
      location: '본관 체육관',
      imageUrl: '/images/smartwatch.jpg',
      status: 'LOST',
    },
    {
      id: 40,
      title: '책갈피',
      date: '2025.05.31.',
      location: '도서관 4층 열람실',
      imageUrl: '/images/bookmark.jpg',
      status: 'LOST',
    },
  ];

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  // 현재 페이지에 표시할 아이템들
  const currentItems = allItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [filters, setFilters] = useState({
    category: [] as string[],
    date: '',
    location: [] as string[],
  });

  // 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.category, filters.date, filters.location]);

  const handleFilterChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectFilterChange = (values: string[], name: string) => {
    setFilters((prev) => ({ ...prev, [name]: values }));
  };

  const handleRemoveFilter = (name: string, valueToRemove?: string) => {
    if (name === 'category' || name === 'location') {
      setFilters((prev) => ({
        ...prev,
        [name]: valueToRemove
          ? (prev[name] as string[]).filter((v) => v !== valueToRemove)
          : [],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const categoryOptions = [
    '교복',
    '체육복',
    '단체복',
    '사복',
    '무선 이어폰',
    '전자기기',
    '안경',
    '기타',
  ];

  const locationOptions = [
    '본관',
    '창의관',
    '체육관',
    '별관',
    '기숙사 A동',
    '기숙사 B동',
    'SRC관',
    '기타',
  ];

  return (
    <StyledFindPage>
      <SearchInput />
      <FilterWrapper>
        <MultiSelectDropdown
          name="category"
          data={categoryOptions}
          value={filters.category}
          onChange={handleMultiSelectFilterChange}
          placeholder="물품"
          width="120px"
        />
        {/* TODO: datepicker 라이브러리로 교체 예정 */}
        <Dropdown
          name="date"
          data={[]}
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="시간"
          width="120px"
        />
        <MultiSelectDropdown
          name="location"
          data={locationOptions}
          value={filters.location}
          onChange={handleMultiSelectFilterChange}
          placeholder="장소"
          width="120px"
        />
        {filters.category.length > 0 && (
          <FilterTag>
            <span>
              {filters.category.length === 1
                ? filters.category[0]
                : `${filters.category[0]} 외 ${filters.category.length - 1}`}
            </span>
            <RemoveButton onClick={() => handleRemoveFilter('category')}>
              <IconMinus width={10} color={color.white} />
            </RemoveButton>
          </FilterTag>
        )}
        {filters.location.length > 0 && (
          <FilterTag>
            <span>
              {filters.location.length === 1
                ? filters.location[0]
                : `${filters.location[0]} 외 ${filters.location.length - 1}`}
            </span>
            <RemoveButton onClick={() => handleRemoveFilter('location')}>
              <IconMinus width={10} color={color.white} />
            </RemoveButton>
          </FilterTag>
        )}
      </FilterWrapper>

      <ProductGrid>
        {Array.from(
          { length: Math.ceil(currentItems.length / 2) },
          (_, rowIndex) => {
            const rowItems = currentItems.slice(rowIndex * 2, rowIndex * 2 + 2);
            return (
              <ProductRow key={rowIndex}>
                {rowItems.map((item) => (
                  <ProductListItem key={item.id} product={item} size="medium" />
                ))}
                {rowItems.length === 1 && <EmptySpace />}
              </ProductRow>
            );
          }
        )}
      </ProductGrid>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </StyledFindPage>
  );
};

export default FindPage;

const StyledFindPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.primary};
  color: ${color.white};
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;

  span {
    white-space: nowrap;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ProductRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  > a {
    flex: 1;
    width: calc((100% - 20px) / 2) !important;
    min-width: 0;
    max-width: calc((100% - 20px) / 2);
    flex-shrink: 0;
  }
`;

const EmptySpace = styled.div`
  flex: 1;
`;
