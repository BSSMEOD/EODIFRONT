import React from 'react';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Divider } from '@components/common/Divider/Divider';
import Text from '@components/common/Text/Text';
import color from '@styles/color';
import { useOverlay } from '@toss/use-overlay';
import ClaimModal from '@components/findDetail/ClaimModal/ClaimModal';
import { useFindDetailQuery } from '@services/item/queries';
import { useRouter } from 'next/navigation';
import { formatDateKor } from '@/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@components/common/Button/Button';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';

interface FindDetailContentProps {
  id: number;
}

const FindDetailContent = ({ id }: FindDetailContentProps) => {
  const router = useRouter();
  const { data: itemData, error } = useFindDetailQuery(id);
  const overlay = useOverlay();
  const { authority, isInitialized } = useAuthStore();

  React.useEffect(() => {
    if (error) {
      toast.error('분실물을 찾을 수 없습니다.');
      router.back();
    }
  }, [error, router]);

  if (!itemData || !isInitialized) return null;

  const handleClaimClick = () => {
    if (authority !== 'USER') {
      toast.error('회수요청은 유저만 할 수 있습니다.');
      return;
    }
    overlay.open(({ isOpen, close }) => (
      <ClaimModal id={id} isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <StyledFindDetailContent>
      <ProductImage
        width={400}
        height={400}
        src={itemData.imageUrl}
        alt="상품 이미지"
      />
      <Flex
        direction="column"
        gap={20}
        style={{ flex: '1 0 auto' }}
        width={400}
      >
        <Text variant="H2">{itemData.name}</Text>
        <Flex direction="row" gap={20} align="center">
          <Text variant="p1">최초 발견 일시</Text>
          <Divider orientation="vertical" length={16} color={color.gray400} />
          <Text variant="p1">{formatDateKor(itemData.foundAt)}</Text>
        </Flex>
        <Flex direction="row" gap={20} align="center">
          <Text variant="p1">최초 발견 장소</Text>
          <Divider orientation="vertical" length={16} color={color.gray400} />
          <Text variant="p1">
            {itemData.foundPlace}/{itemData.foundPlaceDetail}
          </Text>
        </Flex>
        {authority === 'ADMIN' ? (
          <Button
            styleType="PRIMARY"
            height={50}
            onClick={() => router.push(`${ROUTES.RECALL}?itemId=${id}`)}
          >
            <Text variant="H3">회수 요청 확인하기</Text>
          </Button>
        ) : (
          <Button
            styleType="PRIMARY"
            height={50}
            onClick={handleClaimClick}
            disabled={authority === 'TEACHER'}
          >
            <Text variant="H3">내 물건이에요!</Text>
          </Button>
        )}
      </Flex>
    </StyledFindDetailContent>
  );
};

const StyledFindDetailContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

const ProductImage = styled(Image)`
  border-radius: 12px;
  width: 40%;
  min-width: 400px;
  height: 400px;
  object-fit: contain;
  background: ${color.gray100};
`;

export default FindDetailContent;
