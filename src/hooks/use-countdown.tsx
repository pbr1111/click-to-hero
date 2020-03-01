import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';

const useCountdown = (
    initialSeconds: number,
    onEnd: () => void
): [number | undefined, Dispatch<SetStateAction<number | undefined>>] => {
    const [currentSeconds, setCurrentSeconds] = useState<number | undefined>(initialSeconds);
    const onEndRef = useRef<() => void>(onEnd);

    useEffect(() => {
        if (initialSeconds) {
            const interval = setInterval(() => {
                setCurrentSeconds(value => {
                    if (value) {
                        if (value <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return value - 1;
                    }
                });
            }, 1000);
            setCurrentSeconds(initialSeconds);

            return () => clearInterval(interval);
        }
    }, [initialSeconds]);

    useEffect(() => {
        if (currentSeconds === 0) {
            onEndRef.current?.();
        }
    }, [currentSeconds]);

    useEffect(() => {
        onEndRef.current = onEnd;
    }, [onEnd]);

    return [currentSeconds, setCurrentSeconds];
};

export { useCountdown };
