import { useEffect, useState } from 'react';
import { MOBILE_BLOCK_SIZE } from '@/constants/common/constants';

const useMobile = (breakpoint = MOBILE_BLOCK_SIZE) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    setIsInitialized(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return { isMobile, isInitialized };
};

export default useMobile;
