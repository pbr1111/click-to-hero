import { Storage } from '@capacitor/core';
import { wrapPromise, WrappedPromise } from './suspense-helper';

export const saveLastLevel = async (level: number): Promise<void> => {
    await Storage.set({
        key: 'level',
        value: JSON.stringify(level)
    });
};

export const loadLastLevel = async (): Promise<number | undefined> => {
    const { value } = await Storage.get({ key: 'level' });
    return value ? parseInt(value) : undefined;
};

export const fetchLevelLoader = (): { level: WrappedPromise<number | undefined> } => {
    return {
        level: wrapPromise(loadLastLevel())
    };
};
