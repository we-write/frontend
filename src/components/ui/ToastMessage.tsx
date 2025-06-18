import { ToastMessageProps, ToastStatusType } from '@/types/toastType';
import {
  CircleX,
  CircleCheck,
  TriangleAlert,
  CircleAlert,
  X,
} from 'lucide-react';

const ToastMessage = ({ toastData, closeToast }: ToastMessageProps) => {
  const getToastBgColor = (type: ToastStatusType) => {
    switch (type) {
      case 'error':
        return 'bg-rose-300';
      case 'success':
        return 'bg-emerald-200';
      case 'warning':
        return 'bg-amber-200';
      case 'info':
        return 'bg-write-info';
      default:
        return 'bg-write-info';
    }
  };

  const renderToastIcon = (type: ToastStatusType) => {
    const toastIconSize = `w-7 h-7`;

    switch (type) {
      case 'error':
        return <CircleX className={toastIconSize} aria-hidden="true" />;
      case 'success':
        return <CircleCheck className={toastIconSize} aria-hidden="true" />;
      case 'warning':
        return <TriangleAlert className={toastIconSize} aria-hidden="true" />;
      default:
        return <CircleAlert className={toastIconSize} aria-hidden="true" />;
    }
  };

  return (
    <div
      className={`relative flex max-w-120 min-w-90 items-center gap-4 rounded-xl px-7 py-6 text-black shadow transition-all ${getToastBgColor(toastData.type)}`}
    >
      <span>{renderToastIcon(toastData.type)}</span>
      <div className="flex flex-col">
        {toastData.title && (
          <p className="line-clamp-1 text-lg font-semibold">
            {toastData.title}
          </p>
        )}
        <p className="line-clamp-2 text-[1.05rem]">{toastData.message}</p>
      </div>
      <button
        type="button"
        onClick={() => closeToast(toastData.id)}
        className="ml-auto"
        aria-label="토스트 닫기"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ToastMessage;
