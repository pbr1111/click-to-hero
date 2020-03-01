import React from 'react';
import GameRun from './game/game-run';
import { useGameContext, useGameContextActions } from './game/game-context';
import GameEnd from './game/game-end';
import { IonPage, IonContent, useIonViewWillEnter } from '@ionic/react';

const Game: React.FC = () => {
    const { state, seconds } = useGameContext();
    const { startGame } = useGameContextActions();

    useIonViewWillEnter(() => {
        startGame();
    }, [startGame]);

    return (
        <IonPage>
            <IonContent>
                {state === 'running' && seconds ? (
                    <GameRun />
                ) : state === 'ended' ? (
                    <GameEnd />
                ) : null}
            </IonContent>
        </IonPage>
    );
};
export default Game;
