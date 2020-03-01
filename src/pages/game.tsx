import React, { lazy } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router';
import { GameProvider } from './game/game-context';

const GameRun = lazy(() => import('./game/game-run'));
const GameEnd = lazy(() => import('./game/game-end'));

const Game: React.FC = () => (
    <GameProvider>
        <IonRouterOutlet>
            <Route exact path="/game/run" component={GameRun} />
            <Route exact path="/game/end" component={GameEnd} />
        </IonRouterOutlet>
    </GameProvider>
);

export default Game;
