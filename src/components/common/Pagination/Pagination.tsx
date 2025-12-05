'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import IconLeftArrow from '@/icons/src/IconLeftArrow';
import IconRightArrow from '@/icons/src/IconRightArrow';
import { PaginationProps } from './Pagination.types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = false,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  // 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // 시작이나 끝 부분에서 maxVisiblePages만큼 보여주기 위한 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      {showFirstLast && (
        <PaginationButton disabled={currentPage === 1} onClick={handleFirst}>
          처음
        </PaginationButton>
      )}

      <PaginationButton
        disabled={currentPage === 1}
        onClick={handlePrevious}
        aria-label="이전 페이지"
      >
        <IconLeftArrow width={20} height={20} />
      </PaginationButton>

      {visiblePages.map((page) => (
        <PageNumber
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={handleNext}
        aria-label="다음 페이지"
      >
        <IconRightArrow width={20} height={20} />
      </PaginationButton>

      {showFirstLast && (
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={handleLast}
        >
          끝
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background-color: transparent;
  color: ${color.gray400};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
`;

const PageNumber = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: ${({ active }) => (active ? `1px solid ${color.primary}` : 'none')};
  background-color: ${({ active }) => (active ? color.primary : 'transparent')};
  color: ${({ active }) => (active ? color.white : color.gray400)};
  border-radius: ${({ active }) => (active ? '50%' : '0')};
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
`;
