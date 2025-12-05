import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import color from '@styles/color';
import IconConvert from '@/icons/src/IconConvert';
import font from '@styles/font';
import IconLink from '@/icons/src/IconLink';

interface PointItem {
  itemName: string;
  studentName: string;
  reporter: string;
  status: 'paid' | 'unpaid';
}

const PointTable = () => {
  const pointData: PointItem[] = [
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
  ];

  const handleConvert = () => {};
  return (
    <StyledPointTable>
      <TableWrapper>
        <Flex>
          <Th
            width="20%"
            height={56}
            borderTopLeftRadius={10}
            textColor={color.white}
          >
            물품명
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            수령 학생
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            신고자
          </Th>
          <Th width="20%" height={56} textColor={color.white}>
            상점 상태
          </Th>
          <Th
            width="20%"
            height={56}
            borderTopRightRadius={10}
            textColor={color.white}
          >
            수정
          </Th>
        </Flex>
        {pointData.map((item, index) => (
          <Flex key={index}>
            <Td width="20%" height={56}>
              <ItemName>
                {item.itemName}
                <IconLink width={24} />
              </ItemName>
            </Td>
            <Td width="20%" height={56}>
              {item.studentName}
            </Td>
            <Td width="20%" height={56}>
              {item.reporter}
            </Td>
            <Td width="20%" height={56}>
              <StatusText $status={item.status}>
                {item.status === 'paid' ? '지급' : '미지급'}
              </StatusText>
            </Td>
            <Td width="20%" height={56}>
              <ConvertButton onClick={handleConvert}>
                <IconConvert width={24} height={24} />
              </ConvertButton>
            </Td>
          </Flex>
        ))}
      </TableWrapper>
    </StyledPointTable>
  );
};

export default PointTable;

const StyledPointTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusText = styled.span<{ $status: 'paid' | 'unpaid' }>`
  ${font.p2}
  color: ${({ $status }) => ($status === 'paid' ? color.green : color.red)};
`;

const ConvertButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.gray100};
  }
`;
