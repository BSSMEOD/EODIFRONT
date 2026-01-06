import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import BaseModal from '@components/common/Modal/BaseModal';
import color from '@styles/color';
import { Item } from '@/types/item/client';
import IconStacks from '@/icons/src/IconStacks';

interface RejectModalProps {
  isOpen: boolean;
  item: Item | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const RejectModal = ({
  isOpen,
  item,
  onClose,
  onConfirm,
}: RejectModalProps) => {
  const handleConfirm = () => {
    if (!item) return;
    onConfirm(item.id);
    onClose();
  };

  if (!item) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmButtonType="DANGER"
      cancelButtonType="GHOST_DANGER"
    >
      <Flex direction="column" gap={40} style={{ paddingBottom: '40px' }}>
        <Flex gap={4} align="center">
          <IconStacks width={16} height={16} />
          <Text variant="p4" color={color.gray500}>
            물품명: {item.name}
          </Text>
        </Flex>

        <Text variant="H3" color={color.black} textAlign="center">
          반려하시겠습니까?
        </Text>
      </Flex>
    </BaseModal>
  );
};

export default RejectModal;
