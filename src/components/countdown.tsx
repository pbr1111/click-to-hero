import React, { memo, useEffect, useState } from 'react';

type CountdownProps = {
    seconds: number;
    onEnd?: () => void;
};

const Countdown: React.FC<CountdownProps> = ({ seconds, onEnd }: CountdownProps) => {
    const [currentSeconds, setCurrentSeconds] = useState<number>();

    useEffect(() => {
        if (seconds) {
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
            setCurrentSeconds(seconds);

            return () => clearInterval(interval);
        }
    }, [seconds]);

    useEffect(() => {
        if (currentSeconds === 0) {
            onEnd?.();
        }
    }, [currentSeconds, onEnd]);

    return <>{currentSeconds}</>;
};

const CountdownMemo = memo(Countdown);

export { CountdownMemo as Countdown };
