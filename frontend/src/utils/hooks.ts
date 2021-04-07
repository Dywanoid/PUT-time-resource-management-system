import { useRef, useEffect } from 'react';

export const useMount = (): boolean => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted.current;
};