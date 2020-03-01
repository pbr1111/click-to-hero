import React, { useCallback, useRef, useEffect } from 'react';
import { IonButton } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { Minotaur, MinotaurAction, MinotaurRef } from '../../components/minotaur';
import { useGameContext, useGameContextActions } from './game-context';
import { useCountdown } from '../../hooks/use-countdown';

const GameRun: React.FC = () => {
    const { t } = useTranslation('game');
    const { seconds, clicks } = useGameContext();
    const { addClicks, endGame } = useGameContextActions();
    const minotaurRef = useRef<MinotaurRef>(null);
    const countdown = useCountdown(seconds);

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

    useEffect(() => {
        if (countdown === 0) {
            onGameEnd();
        }
    }, [countdown, onGameEnd]);

    return (
        <>
            {countdown}
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
        </>
    );
};

export default GameRun;
