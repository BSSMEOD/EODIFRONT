import { useEffect, useState } from 'react';
import { MOBILE_BLOCK_SIZE } from '@/constants/common/constants';

const useMobile = (breakpoint = MOBILE_BLOCK_SIZE) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const check = () => setIsMobile(mql.matches);
    check();
    setIsInitialized(true);
    mql.addEventListener('change', check);
    return () => mql.removeEventListener('change', check);
  }, [breakpoint]);

  return { isMobile, isInitialized };
};

export default useMobile;
