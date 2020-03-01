import { GameContextState, initialState } from '../game-context';

export type GameAction =
    | { type: 'ADD_CLICKS'; value: number }
    | { type: 'END_GAME' | 'RESTART_GAME' }
    | { type: 'START_GAME'; seconds: number };

export const GameContextReducer = (
    state: GameContextState,
    action: GameAction
): GameContextState => {
    switch (action.type) {
        case 'ADD_CLICKS': {
            const { clicks: currentClicks } = state;
            const { value } = action;
            return {
                ...state,
                clicks: currentClicks + value
            };
        }
        case 'END_GAME': {
            return {
                ...state,
                state: 'ended'
            };
        }
        case 'START_GAME': {
            const { seconds } = action;
            return {
                ...initialState,
                seconds
            };
        }
        case 'RESTART_GAME': {
            const { seconds } = state;
            return {
                ...initialState,
                seconds
            };
        }
    }
};
