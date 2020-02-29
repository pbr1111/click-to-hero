import { useRef, useEffect, DependencyList, EffectCallback } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList = []) => {
    const firstUpdate = useRef(true);
    const effectRef = useRef(effect);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        return effectRef.current();
        //eslint-disable-next-line
    }, deps);

    useEffect(() => {
        effectRef.current = effect;
    }, [effect]);
};

export { useUpdateEffect };
