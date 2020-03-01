import React, { useState, useEffect, useCallback } from 'react';
import { createContext, useContext, PropsWithChildren } from 'react';
import { loadLastLevel, saveLastLevel } from '../utils/level-saver';
import { Loader } from '../components/loader';

type LevelContextState = {
    level?: number;
};

type LevelContextActionsState = {
    nextLevel: () => Promise<void>;
};

const LevelContext = createContext<LevelContextState>({});
const LevelContextActions = createContext<Partial<LevelContextActionsState>>({}) as React.Context<
    LevelContextActionsState
>;

type LevelProviderProps = PropsWithChildren<{}>;

const LevelProvider: React.FC<LevelProviderProps> = ({ children }: LevelProviderProps) => {
    const [level, setLevel] = useState<number>();

    useEffect(() => {
        const setLastLevel = async (): Promise<void> => {
            const lastLevel = await loadLastLevel();
            setLevel(lastLevel ?? 1);
        };
        setLastLevel();
    }, []);

    const nextLevel = useCallback(async () => {
        const newLevel = level! + 1;
        setLevel(newLevel);
        await saveLastLevel(newLevel);
        console.log(newLevel);
    }, [level]);

    return (
        <LevelContextActions.Provider value={{ nextLevel }}>
            <LevelContext.Provider value={{ level }}>
                {level === undefined ? <Loader /> : children}
            </LevelContext.Provider>
        </LevelContextActions.Provider>
    );
};

const useLevelContextActions = () => useContext(LevelContextActions);
const useLevelContext = () => useContext(LevelContext);

export { useLevelContext, useLevelContextActions, LevelProvider };
