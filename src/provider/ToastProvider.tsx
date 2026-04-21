'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMobile from '@hooks/useMobile';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const isMobile = useMobile();

  return (
    <>
      {children}
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        position={isMobile ? 'top-center' : 'top-right'}
        style={
          isMobile
            ? {
                width: 'calc(100% - 32px)',
                left: '16px',
                right: '16px',
                top: '16px',
              }
            : undefined
        }
        toastStyle={
          isMobile ? { fontSize: '0.875rem', minHeight: 'auto' } : undefined
        }
      />
    </>
  );
}
