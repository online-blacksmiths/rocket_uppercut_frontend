import { useRef } from 'react';

export default function useDebounce<T extends any[]>(callback: (...args: T) => void, time: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...args: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, time);
  };
}
