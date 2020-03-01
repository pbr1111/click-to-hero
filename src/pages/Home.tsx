import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { generateDifficultyLevelSeconds } from '../utils/level-generator';
import './home.scss';

const Home: React.FC = () => {
    const { t } = useTranslation('home');
    const history = useHistory();

    const loadGame = useCallback(() => {
        const seconds = generateDifficultyLevelSeconds();
        history.push(`/game/${seconds}`);
    }, []);

    return (
        <IonPage className="home-page">
            <IonContent className="ion-padding">
                <div className="home-page__content">
                    <IonGrid className="ion-align-self-center">
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h1>{t('title')}</h1>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonButton color="primary" expand="block" onClick={loadGame}>
                                    {t('start')}
                                </IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonButton color="secondary" expand="block">
                                    {t('survival')}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
