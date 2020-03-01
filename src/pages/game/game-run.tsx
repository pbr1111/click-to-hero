import React, { useCallback, useRef, useEffect } from 'react';
import { IonButton, IonPage, IonContent, useIonViewDidEnter } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Countdown } from '../../components/countdown';
import { Minotaur, MinotaurAction, MinotaurRef } from '../../components/minotaur';
import { useGameContext, useGameContextActions } from './game-context';

const GameRun: React.FC = () => {
    const { t } = useTranslation('game');
    const { seconds, clicks } = useGameContext();
    const { addClicks, endGame, startGame } = useGameContextActions();
    const minotaurRef = useRef<MinotaurRef>(null);

    useIonViewDidEnter(() => {
        startGame();
    }, []);

    const onAddClicks = useCallback(
        (numClicks: number, action: MinotaurAction) => () => {
            addClicks(numClicks);
            return minotaurRef.current?.do(action);
        },
        [addClicks]
    );

    const onGameEnd = useCallback(async () => {
        await minotaurRef.current?.do('death');
        endGame();
    }, [endGame]);

    return (
        <IonPage>
            <IonContent>
                <Countdown seconds={seconds} onEnd={onGameEnd} />
                <h1>{clicks}</h1>
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
            </IonContent>
        </IonPage>
    );
};

export default GameRun;
