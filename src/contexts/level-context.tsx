import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { fetchLevelLoader, saveLastLevel } from '../utils/level-saver';

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

const levelLoader = fetchLevelLoader();

const LevelProvider: React.FC<LevelProviderProps> = ({ children }: LevelProviderProps) => {
    const [level, setLevel] = useState<number>();

    const savedLevelValue = levelLoader.level.read();

    useEffect(() => {
        setLevel(savedLevelValue ?? 1);
    }, [savedLevelValue]);

    const nextLevel = useCallback(async () => {
        const newLevel = level! + 1;
        setLevel(newLevel);
        await saveLastLevel(newLevel);
    }, [level]);

    return (
        <LevelContextActions.Provider value={{ nextLevel }}>
            <LevelContext.Provider value={{ level }}>{children}</LevelContext.Provider>
        </LevelContextActions.Provider>
    );
};

const useLevelContextActions = () => useContext(LevelContextActions);
const useLevelContext = () => useContext(LevelContext);

export { useLevelContext, useLevelContextActions, LevelProvider };
