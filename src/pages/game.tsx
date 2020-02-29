import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useCallback, useReducer } from 'react';
import { Countdown } from '../components/countdown';
import { GameReducer } from './game/game-reducer';
import './game.scss';

export type GameState = {
    clicks: number;
};

const initialState: GameState = {
    clicks: 0
};

const Game: React.FC = () => {
    const [state, dispatch] = useReducer(GameReducer, initialState);

    const addClicks = useCallback(
        (numClicks: number) => () => {
            dispatch({ type: 'ADD_CLICKS', value: numClicks });
        },
        []
    );

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Countdown
                    seconds={60}
                    onEnd={() => {
                        console.log('END');
                    }}
                />
                <h1>{state.clicks}</h1>
                <IonButton onClick={addClicks(1)}>x1</IonButton>
                <IonButton onClick={addClicks(10)}>x10</IonButton>
                <IonButton onClick={addClicks(100)}>x100</IonButton>
                <IonButton onClick={addClicks(1000)}>x1000</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Game;
