import Th from '@ui/Table/Th';
import Td from '@ui/Table/Td';
import IconLink from '@package/icon/src/IconLink';
import styled from '@emotion/styled';
import Flex from '@ui/Flex/Flex';
import color from '@styles/color';

interface LogItem {
  receivedDate: string;
  studentName: string;
  itemName: string;
  givenDate: string;
}

const LogTable = () => {
  const logData: LogItem[] = Array(8).fill({
    receivedDate: '2025-08-05',
    studentName: '문소정',
    itemName: '에어팟 3세대',
    givenDate: '2025-08-05',
  });
  return (
    <LogTableWrapper>
      <Flex width="100%" height={56}>
        <Th
          width="25%"
          height={56}
          borderTopLeftRadius={10}
          textColor={color.white}
        >
          접수된 날짜
        </Th>
        <Th width="25%" height={56} textColor={color.white}>
          수령 학생
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
          지급된 날짜
        </Th>
      </Flex>
      {logData.map((item, index) => (
        <Flex key={index}>
          <Td width="25%" height={56}>
            {item.receivedDate}
          </Td>
          <Td width="25%" height={56}>
            {item.studentName}
          </Td>
          <Td width="25%" height={56}>
            <ItemName>
              {item.itemName}
              <IconLink width={24} />
            </ItemName>
          </Td>
          <Td width="25%" height={56}>
            {item.givenDate}
          </Td>
        </Flex>
      ))}
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
