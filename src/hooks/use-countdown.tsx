import { useEffect, useState } from 'react';

const useCountdown = (initialSeconds: number): number | undefined => {
    const [currentSeconds, setCurrentSeconds] = useState<number | undefined>();

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

    return currentSeconds;
};

export { useCountdown };
