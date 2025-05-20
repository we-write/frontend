import { useCallback, useState } from 'react';

const useBoolean = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const changeValue = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return { value, toggle, setTrue, setFalse, changeValue };
};

export default useBoolean;
