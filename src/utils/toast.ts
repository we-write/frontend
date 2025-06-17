import { ToastCallableWithStatus, ToastParams } from '@/types/toastType';

export const TOAST_STATUS = ['info', 'warning', 'error', 'success'] as const;

let _showToast: (params: ToastParams) => void;

const toast = ((params: ToastParams) => {
  _showToast?.(params);
}) as ToastCallableWithStatus;

TOAST_STATUS.forEach((type) => {
  toast[type] = (message: string) => toast({ type, message });
});

toast._setInstance = (showToastFn) => {
  _showToast = showToastFn;
};

export default toast;
