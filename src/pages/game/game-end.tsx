import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameContext, useGameContextActions } from './game-context';
import { IonButton } from '@ionic/react';

const GameEnd: React.FC = () => {
    const { t } = useTranslation('game');
    const { seconds, clicks } = useGameContext();
    const { restartCurrentGame, goToNextLevel } = useGameContextActions();
    return (
        <>
            <p>{t('totalTime', { seconds: seconds })}</p>
            <p>{t('totalClicks', { clicks: clicks })}</p>

            <IonButton onClick={restartCurrentGame}>{t('restartLevel')}</IonButton>
            <IonButton onClick={goToNextLevel}>{t('nextLevel')}</IonButton>
            <IonButton routerLink="/">{t('home')}</IonButton>
        </>
    );
};

export default GameEnd;
