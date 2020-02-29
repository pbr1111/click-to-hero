import { GameState } from '../game';

export type GameAction = { type: 'ADD_CLICKS'; value: number };

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
    }
};
