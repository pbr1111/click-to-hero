import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useCallback, useReducer, useRef, useEffect } from 'react';
import { Countdown } from '../components/countdown';
import { GameReducer } from './game/game-reducer';
import { Minotaur, MinotaurRef, MinotaurAction } from '../components/minotaur';
import { useTranslation } from 'react-i18next';
import { generateDifficultyLevelSeconds } from '../utils/level-generator';
import { Loader } from '../components/loader';
import { useLevelContext, useLevelContextActions } from '../contexts/level-context';
import './game.scss';

export type GameState = {
    clicks: number;
    seconds?: number;
    state: 'running' | 'ended';
};

export const initialState: GameState = {
    clicks: 0,
    state: 'running'
};

const Game: React.FC = () => {
    const { t } = useTranslation('game');
    const { level } = useLevelContext();
    const { nextLevel } = useLevelContextActions();
    const minotaurRef = useRef<MinotaurRef>(null);
    const [state, dispatch] = useReducer(GameReducer, initialState);

    useEffect(() => {
        const seconds = generateDifficultyLevelSeconds(level);
        dispatch({ type: 'START_GAME', seconds });
    }, [level]);

    const onAddClicks = useCallback(
        (numClicks: number, action: MinotaurAction) => () => {
            dispatch({ type: 'ADD_CLICKS', value: numClicks });
            return minotaurRef.current?.do(action);
        },
        [dispatch]
    );

    const onGameEnd = useCallback(async () => {
        dispatch({ type: 'END_GAME' });
        await minotaurRef.current?.do('death');
    }, [dispatch]);

    const onRestartLevel = useCallback(() => {
        dispatch({ type: 'RESTART_GAME' });
    }, []);

    const onNextLevel = useCallback(async () => {
        // TODO
        dispatch({ type: 'RESTART_GAME' });
        await nextLevel();
    }, [nextLevel]);

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
                                <Countdown seconds={state.seconds} onEnd={onGameEnd} />
                                <h1>{state.clicks}</h1>
                                <Minotaur ref={minotaurRef} />

                                <IonButton onClick={onAddClicks(1, 'attack3')}>
                                    {t('multiplier', { value: 1 })}
                                </IonButton>
                                <IonButton onClick={onAddClicks(10, 'attack2')}>
                                    {t('multiplier', { value: 10 })}
                                </IonButton>
                                <IonButton onClick={onAddClicks(100, 'attack1')}>
                                    {t('multiplier', { value: 100 })}
                                </IonButton>
                                <IonButton onClick={onAddClicks(1000, 'attack4')}>
                                    {t('multiplier', { value: 1000 })}
                                </IonButton>
                                <IonButton onClick={onGameEnd}>{t('endGame')}</IonButton>
                            </>
                        ) : state.state === 'ended' ? (
                            <>
                                <p>{t('totalTime', { seconds: state.seconds })}</p>
                                <p>{t('totalClicks', { clicks: state.clicks })}</p>

                                <IonButton onClick={onRestartLevel}>{t('restartLevel')}</IonButton>
                                <IonButton onClick={onNextLevel}>{t('nextLevel')}</IonButton>
                            </>
                        ) : null}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Game;
