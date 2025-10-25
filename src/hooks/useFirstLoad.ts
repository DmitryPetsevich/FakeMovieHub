import { useEffect, useRef } from 'react';

export default function useFirstLoad(delay = 1000) {
  const firstLoad = useRef(true);

  useEffect(() => {
    let timerID = setTimeout(() => {
      firstLoad.current = false;
    }, delay);

    return () => clearTimeout(timerID);
  }, [delay]);

  return firstLoad.current;
}
