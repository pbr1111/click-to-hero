import { Storage } from '@capacitor/core';

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
