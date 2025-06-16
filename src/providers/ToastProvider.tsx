'use client';

import ToastMessage from '@/components/ui/ToastMessage';
import {
  ToastContextType,
  ToastData,
  ToastParams,
  ToastPositionType,
} from '@/types/toastType';
import toast from '@/utils/toast';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const ToastContext = createContext<ToastContextType | null>(null);

const DEFAULT_DURATION_MS = 6000;
const DEFAULT_POSITION: ToastPositionType = 'bottom';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [currentPosition, setCurrentPosition] =
    useState<ToastPositionType>(DEFAULT_POSITION);

  const showToast = useCallback((params: ToastParams) => {
    const id = crypto.randomUUID();

    const toastDuration =
      params.duration !== undefined
        ? params.duration * 1000
        : DEFAULT_DURATION_MS;
    const toastPosition = params.position ?? DEFAULT_POSITION;

    const currentToastData: ToastData = {
      id,
      type: params.type,
      title: params.title,
      message: params.message,
      duration: toastDuration,
      position: toastPosition,
    };

    setToasts((prev) => [...prev, currentToastData]);
    setCurrentPosition(toastPosition);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, toastDuration);
  }, []);

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    toast._setInstance(showToast);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 md:right-10 md:left-auto md:translate-x-0 ${currentPosition === 'top' ? 'top-12' : 'bottom-8'}`}
      >
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            toastData={toast}
            closeToast={handleCloseToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      'useToastContext 훅은 ToastProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};
