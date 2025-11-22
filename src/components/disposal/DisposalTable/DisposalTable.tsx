import styled from '@emotion/styled';
import font from '@styles/font';
import color from '@styles/color';
import Flex from '@ui/Flex/Flex';
import Th from '@ui/Table/Th';
import Td from '@ui/Table/Td';
import IconLink from '@package/icon/src/IconLink';
import IconConvert from '@package/icon/src/IconConvert';
import { useOverlay } from '@toss/use-overlay';
import DisposalReasonModal from '@components/disposal/DisposalReasonModal/DisposalReasonModal';

interface DisposalItem {
  remainDate: string;
  itemName: string;
  status: 'expected' | 'completed';
}

const DisposalTable = () => {
  const overlay = useOverlay();

  const disposalData: DisposalItem[] = [
    { remainDate: '1', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
    { remainDate: '8', itemName: '에어팟 3세대', status: 'expected' },
  ];

  const handleConvert = (item: DisposalItem) => {
    overlay.open(({ isOpen, close }) => (
      <DisposalReasonModal
        isOpen={isOpen}
        itemName={item.itemName}
        remainDays={Number(item.remainDate)}
        onClose={close}
        onSubmit={() => {}}
      />
    ));
  };

  return (
    <StyledDisposalTable>
      <TableWrapper>
        <Flex>
          <Th
            width="25%"
            height={56}
            borderTopLeftRadius={10}
            textColor={color.white}
          >
            폐기 날짜
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            물품명
          </Th>
          <Th width="25%" height={56} textColor={color.white}>
            폐기 여부
          </Th>
          <Th
            width="25%"
            height={56}
            borderTopRightRadius={10}
            textColor={color.white}
          >
            폐기 처리 상태
          </Th>
        </Flex>
        {disposalData.map((item, index) => (
          <Flex key={index}>
            <Td width="25%" height={56}>
              D-{item.remainDate}
            </Td>
            <Td width="25%" height={56}>
              <ItemName>
                {item.itemName}
                <IconLink width={24} height={24} color={color.secondary} />
              </ItemName>
            </Td>
            <Td width="25%" height={56}>
              <StatusText $status={item.status}>
                {item.status === 'expected' ? '예정' : '완료'}
              </StatusText>
            </Td>
            <Td width="25%" height={56}>
              <ConvertButton onClick={() => handleConvert(item)}>
                <IconConvert width={24} height={24} color={color.black} />
              </ConvertButton>
            </Td>
          </Flex>
        ))}
      </TableWrapper>
    </StyledDisposalTable>
  );
};

export default DisposalTable;

const StyledDisposalTable = styled.div`
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

const StatusText = styled.span<{ $status: 'expected' | 'completed' }>`
  ${font.p2}
  color: ${color.black};
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
