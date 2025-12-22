import { useEffect, useRef } from 'react';

export const useScrollLock = (isOpen: boolean) => {
  const originalOverflowRef = useRef<string | null>(null);
  const isOverflowSetByModalRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      if (originalOverflowRef.current === null) {
        originalOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';
      isOverflowSetByModalRef.current = true;
    } else {
      if (
        isOverflowSetByModalRef.current &&
        document.body.style.overflow === 'hidden'
      ) {
        document.body.style.overflow = originalOverflowRef.current || '';
      }
      originalOverflowRef.current = null;
      isOverflowSetByModalRef.current = false;
    }

    return () => {
      if (
        isOverflowSetByModalRef.current &&
        document.body.style.overflow === 'hidden'
      ) {
        document.body.style.overflow = originalOverflowRef.current || '';
      }
    };
  }, [isOpen]);
};
