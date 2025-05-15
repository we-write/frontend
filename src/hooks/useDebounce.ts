import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
