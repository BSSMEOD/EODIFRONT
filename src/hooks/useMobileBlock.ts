import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useMobile from '@hooks/useMobile';
import { ROUTES } from '@/constants/common/constants';
import { useEffect } from 'react';

export const useMobileBlock = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      const search = searchParams.toString();
      const from = encodeURIComponent(
        search ? `${pathname}?${search}` : pathname
      );
      router.replace(`${ROUTES.MOBILE_BLOCK}?from=${from}`);
    }
  }, [isMobile, router, pathname, searchParams]);
};
