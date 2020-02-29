import React, { useEffect, useState, memo } from 'react';
import { useUpdateEffect } from '../hooks/use-update-effect';

type CountdownProps = {
    seconds: number;
    onEnd?: () => void;
};

const Countdown: React.FC<CountdownProps> = ({ seconds, onEnd }: CountdownProps) => {
    const [currentSeconds, setCurrentSeconds] = useState<number>(0);

    useEffect(() => {
        if (seconds) {
            const interval = setInterval(() => {
                setCurrentSeconds(value => {
                    if (value <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return value - 1;
                });
            }, 1000);
            setCurrentSeconds(seconds);

            return () => clearInterval(interval);
        }
    }, [seconds]);

    useUpdateEffect(() => {
        if (currentSeconds === 0) {
            onEnd?.();
        }
    }, [currentSeconds]);

    return <>{currentSeconds}</>;
};

const CountdownMemo = memo(Countdown);

export { CountdownMemo as Countdown };
