import { useRouter, usePathname } from 'next/navigation';
import useMobile from '@hooks/useMobile';
import { ROUTES } from '@/constants/common/constants';
import { useEffect } from 'react';

export const useMobileBlock = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      const search = window.location.search;
      const from = encodeURIComponent(
        search ? `${pathname}${search}` : pathname
      );
      router.replace(`${ROUTES.MOBILE_BLOCK}?from=${from}`);
    }
  }, [isMobile, router, pathname]);
};
