import Th from '@components/common/Table/Th';
import Td from '@components/common/Table/Td';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import color from '@styles/color';
import IconConvert from '@/icons/src/IconConvert';
import font from '@styles/font';
import IconLink from '@/icons/src/IconLink';
import { useState } from 'react';
import { giveReward } from '@/api/point/point';
import type { PointItem } from '@/types/point/client';
import { toast } from 'react-toastify';

const PointTable = () => {
  const [pointData, setPointData] = useState<PointItem[]>([
    {
      itemId: 1,
      studentId: 101,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemId: 2,
      studentId: 102,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemId: 3,
      studentId: 103,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemId: 4,
      studentId: 104,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemId: 5,
      studentId: 105,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemId: 6,
      studentId: 106,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
    {
      itemId: 7,
      studentId: 107,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'paid',
    },
    {
      itemId: 8,
      studentId: 108,
      itemName: '에어팟 3세대',
      studentName: '문소정',
      reporter: '조재민',
      status: 'unpaid',
    },
  ]);

  const handleConvert = async (
    itemId: number,
    studentId: number,
    index: number
  ) => {
    try {
      await giveReward({ itemId, studentId });
      setPointData((prevData) => {
        const newData = [...prevData];
        newData[index] = {
          ...newData[index],
          status: newData[index].status === 'paid' ? 'unpaid' : 'paid',
        };
        return newData;
      });
    } catch (error) {
      toast.error('상점 지급에 실패했습니다.');
    }
  };

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
              <ConvertButton
                onClick={() =>
                  handleConvert(item.itemId, item.studentId, index)
                }
              >
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
