import { useRef, useEffect } from 'react';

/**
 *
 * @returns is component mounted
 */
export const useMount = () => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted.current;
};
