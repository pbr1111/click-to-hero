export const generateDifficultyLevelSeconds = (level?: number) => {
    return (level || 1) * 2;
};
