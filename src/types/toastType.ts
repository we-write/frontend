import { TOAST_STATUS } from '@/utils/toast';

export type ToastStatusType = (typeof TOAST_STATUS)[number];

export type ToastPositionType = 'top' | 'bottom';

export interface ToastContextType {
  showToast: (params: ToastParams) => void;
}

export interface ToastParams {
  type: ToastStatusType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPositionType;
}

export interface ToastData extends ToastParams {
  id: string;
}

export interface ToastMessageProps {
  toastData: ToastData;
  closeToast: (id: string) => void;
}

export type ToastCallableWithStatus = ((params: ToastParams) => void) & {
  [K in ToastStatusType]: (message: string) => void;
} & {
  _setInstance: (showToastFn: (params: ToastParams) => void) => void;
};
