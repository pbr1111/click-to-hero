import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useCallback, useReducer, useRef, useEffect, memo } from 'react';
import { Countdown } from '../components/countdown';
import { GameReducer } from './game/game-reducer';
import { Minotaur, MinotaurRef, MinotaurAction } from '../components/minotaur';
import './game.scss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { generateDifficultyLevelSeconds } from '../utils/level-generator';
import { Loader } from '../components/loader';

export type GameState = {
    clicks: number;
    seconds?: number;
    state: 'running' | 'ended';
};

type GameProps = {
    seconds: number;
};

export const initialState: GameState = {
    clicks: 0,
    state: 'running'
};

const Game: React.FC<GameProps> = ({ seconds }: GameProps) => {
    const { t } = useTranslation('game');
    const minotaurRef = useRef<MinotaurRef>(null);
    const history = useHistory();
    const [state, dispatch] = useReducer(GameReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'START_GAME', seconds });
    }, [seconds]);

    const addClicks = useCallback(
        (numClicks: number, action: MinotaurAction) => () => {
            dispatch({ type: 'ADD_CLICKS', value: numClicks });
            return minotaurRef.current?.do(action);
        },
        [dispatch]
    );

    const gameEnd = useCallback(async () => {
        dispatch({ type: 'END_GAME' });
        await minotaurRef.current?.do('death');
    }, [dispatch]);

    const restartLevel = useCallback(() => {
        dispatch({ type: 'RESTART_GAME' });
    }, []);

    const nextLevel = useCallback(() => {
        // TODO: Move to level-generator
        const seconds = generateDifficultyLevelSeconds();
        history.push(`/game/${seconds}`);
        dispatch({ type: 'RESTART_GAME' });
    }, []);

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {!state.seconds ? (
                    <Loader />
                ) : (
                    <>
                        {/* TODO: Move to components */}
                        {state.state === 'running' ? (
                            <>
                                <Countdown seconds={state.seconds} onEnd={gameEnd} />
                                <h1>{state.clicks}</h1>
                                <Minotaur ref={minotaurRef} />

                                <IonButton onClick={addClicks(1, 'attack3')}>
                                    {t('multiplier', { value: 1 })}
                                </IonButton>
                                <IonButton onClick={addClicks(10, 'attack2')}>
                                    {t('multiplier', { value: 10 })}
                                </IonButton>
                                <IonButton onClick={addClicks(100, 'attack1')}>
                                    {t('multiplier', { value: 100 })}
                                </IonButton>
                                <IonButton onClick={addClicks(1000, 'attack4')}>
                                    {t('multiplier', { value: 1000 })}
                                </IonButton>
                                <IonButton onClick={gameEnd}>{t('endGame')}</IonButton>
                            </>
                        ) : state.state === 'ended' ? (
                            <>
                                <p>{t('totalTime', { seconds })}</p>
                                <p>{t('totalClicks', { clicks: state.clicks })}</p>

                                <IonButton onClick={restartLevel}>{t('restartLevel')}</IonButton>
                                <IonButton onClick={nextLevel}>{t('nextLevel')}</IonButton>
                            </>
                        ) : null}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Game;
