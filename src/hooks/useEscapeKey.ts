import { useEffect } from 'react';

interface UseEscapeKeyParams {
  callback: () => void;
  active: boolean;
}

const useEscapeKey = ({ callback, active }: UseEscapeKeyParams) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && active) {
        callback();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback, active]);
};

export default useEscapeKey;
