import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameContext, useGameContextActions } from './game-context';
import { IonButton, IonContent, IonPage } from '@ionic/react';

const GameEnd: React.FC = () => {
    const { t } = useTranslation('game');
    const { seconds, clicks } = useGameContext();
    const { restartCurrentGame, goToNextLevel } = useGameContextActions();
    return (
        <IonPage>
            <IonContent>
                <p>{t('totalTime', { seconds: seconds })}</p>
                <p>{t('totalClicks', { clicks: clicks })}</p>

                <IonButton onClick={restartCurrentGame}>{t('restartLevel')}</IonButton>
                <IonButton onClick={goToNextLevel}>{t('nextLevel')}</IonButton>
                <IonButton routerLink="/home">{t('home')}</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default GameEnd;
