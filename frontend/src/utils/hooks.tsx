import { useRef, useEffect } from 'react';

/**
 *
 * @returns is component mounted
 */
export const useMount = () => {
    const isMounted = useRef<Boolean>(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted.current;
};
