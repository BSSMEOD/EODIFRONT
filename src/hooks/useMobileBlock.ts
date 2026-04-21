import { useRouter, usePathname } from 'next/navigation';
import useMobile from '@hooks/useMobile';
import { ROUTES } from '@/constants/common/constants';
import { useEffect } from 'react';

export const useMobileBlock = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) router.replace(`${ROUTES.MOBILE_BLOCK}?from=${pathname}`);
  }, [isMobile, router, pathname]);
};
