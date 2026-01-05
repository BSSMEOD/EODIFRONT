import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import IconLink from '@/icons/src/IconLink';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import color from '@styles/color';
import font from '@styles/font';
import { useLogListQuery } from '@/services/log/queries';
import type { GetLogListParams } from '@/types/log/params';
import Text from '@components/common/Text/Text';
import { useRouter } from 'next/navigation';

interface LogTableProps {
  filters?: GetLogListParams;
}

const LogTable = ({ filters }: LogTableProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useLogListQuery({
    page: 1,
    size: 100,
    status: 'LOST',
    ...filters,
  });

  const handleItemClick = (itemId: number) => {
    router.push(`/find/detail/${itemId}`);
  };

  const logData = data?.content || [];

  if (isLoading) {
    return (
      <LogTableWrapper>
        <StatusMessage>데이터를 불러오는 중...</StatusMessage>
      </LogTableWrapper>
    );
  }

  if (isError) {
    return (
      <LogTableWrapper>
        <ErrorMessage>
          데이터를 불러오는데 실패했습니다. 다시 시도해 주세요.
        </ErrorMessage>
      </LogTableWrapper>
    );
  }

  return (
    <LogTableWrapper>
      <Flex width="100%" height={56}>
        <Th
          width="25%"
          height={56}
          borderTopLeftRadius={10}
          textColor={color.white}
        >
          습득한 날짜
        </Th>
        <Th width="25%" height={56} textColor={color.white}>
          습득한 장소
        </Th>
        <Th width="25%" height={56} textColor={color.white}>
          물품명
        </Th>
        <Th
          width="25%"
          height={56}
          borderTopRightRadius={10}
          textColor={color.white}
        >
          상세 장소
        </Th>
      </Flex>
      {logData.length === 0 ? (
        <StatusMessage>분실물 기록이 없습니다.</StatusMessage>
      ) : (
        logData.map((item) => (
          <Flex key={item.id}>
            <Td width="25%" height={56}>
              {item.foundAt}
            </Td>
            <Td width="25%" height={56}>
              {item.foundPlace}
            </Td>
            <Td width="25%" height={56}>
              <ItemName>
                {item.name}
                <IconLinkButton
                  aria-label={`${item.name} 상세 정보 보기`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <IconLink width={24} height={24} color={color.secondary} />
                </IconLinkButton>
              </ItemName>
            </Td>
            <Td width="25%" height={56}>
              {item.placeDetail}
            </Td>
          </Flex>
        ))
      )}
    </LogTableWrapper>
  );
};

export default LogTable;

const LogTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const StatusMessage = styled.div`
  ${font.p1}
  color: ${color.gray500};
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  ${font.p1}
  color: ${color.red};
  text-align: center;
  padding: 40px;
`;
