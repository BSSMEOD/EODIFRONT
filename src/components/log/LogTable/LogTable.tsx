import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import IconLink from '@/icons/src/IconLink';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import color from '@styles/color';
import { useLogListQuery } from '@/services/log/queries';
import type { GetLogListParams } from '@/types/log/remote';
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
      {isError ? (
        <Text>다시 시도해 주세요.</Text>
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
                <IconLinkButton onClick={() => handleItemClick(item.id)}>
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
