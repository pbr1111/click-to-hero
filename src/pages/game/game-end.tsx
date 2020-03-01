import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameContext, useGameContextActions } from './game-context';
import { IonButton, IonContent, IonPage } from '@ionic/react';

const GameEnd: React.FC = () => {
    const { t } = useTranslation('game');
    const { seconds, clicks } = useGameContext();
    const { restartCurrentGame, goToNextLevel } = useGameContextActions();

    const onRestartLevel = useCallback(() => {
        restartCurrentGame();
    }, [restartCurrentGame]);

    const onNextLevel = useCallback(async () => {
        goToNextLevel();
    }, [goToNextLevel]);

    return (
        <IonPage>
            <IonContent>
                <p>{t('totalTime', { seconds: seconds })}</p>
                <p>{t('totalClicks', { clicks: clicks })}</p>

                <IonButton onClick={onRestartLevel}>{t('restartLevel')}</IonButton>
                <IonButton onClick={onNextLevel}>{t('nextLevel')}</IonButton>
                <IonButton routerLink="/home">{t('nextLevel')}</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default GameEnd;
