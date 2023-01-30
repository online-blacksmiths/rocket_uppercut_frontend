import { useEffect, useState } from 'react';

export default function useDebounce(value: string, time: number) {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);

  return debounceValue;
}
