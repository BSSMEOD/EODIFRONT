import React from 'react';
import Flex from '@components/common/Flex/Flex';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Divider } from '@components/common/Divider/Divider';
import Text from '@components/common/Text/Text';
import color from '@styles/color';
import { Button } from '@components/common/Button/Button';
import { useOverlay } from '@toss/use-overlay';
import ClaimModal from '@components/findDetail/ClaimModal/ClaimModal';
import { useFindDetailQuery } from '@services/item/queries';
import { useRouter } from 'next/navigation';

interface FindDetailContentProps {
  id: number;
}

const FindDetailContent = ({ id }: FindDetailContentProps) => {
  const router = useRouter();
  const { data: itemData, error } = useFindDetailQuery(id);
  const overlay = useOverlay();

  React.useEffect(() => {
    if (error) {
      alert('분실물을 찾을 수 없습니다.');
      router.back();
    }
  }, [error, router]);

  const handleClaimClick = () => {
    overlay.open(({ isOpen, close }) => (
      <ClaimModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={(reason) => {
          console.log('Claim submitted:', { productId: id, reason });
        }}
      />
    ));
  };

  return (
    <Flex direction="row" gap={50} align="flex-end">
      <ProductImage
        width={400}
        height={400}
        src={itemData?.image_url || ''}
        alt="상품 이미지"
      />
      <Flex direction="column" gap={20} width={470}>
        <Flex direction="column" gap={20}>
          <Text variant="H2">{itemData?.name}</Text>
          <Flex direction="row" gap={20} align="center">
            <Text variant="p1">최초 발견 일시</Text>
            <Divider orientation="vertical" length={16} color={color.gray400} />
            <Text variant="p1">{itemData?.found_at}</Text>
          </Flex>
          <Flex direction="row" gap={20} align="center">
            <Text variant="p1">최초 발견 장소</Text>
            <Divider orientation="vertical" length={16} color={color.gray400} />
            <Text variant="p1">
              {itemData?.found_place}/{itemData?.found_place_detail}
            </Text>
          </Flex>
        </Flex>
        <Button styleType="PRIMARY" height={50} onClick={handleClaimClick}>
          <Text variant="H3" color={color.white}>
            내 물건이에요!
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

const ProductImage = styled(Image)`
  border-radius: 12px;
`;

export default FindDetailContent;
