import { GameState, initialState } from '../game';

export type GameAction =
    | { type: 'ADD_CLICKS'; value: number }
    | { type: 'END_GAME' | 'RESTART_GAME' }
    | { type: 'START_GAME'; seconds: number };

export const GameReducer = (state: GameState, action: GameAction): GameState => {
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
