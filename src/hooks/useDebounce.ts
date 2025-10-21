import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setValue] = useState(value);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [value, delay]);

  return debouncedValue;
}
