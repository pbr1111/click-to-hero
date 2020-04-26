import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './home.scss';

const Home: React.FC = () => {
    const { t } = useTranslation('home');

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
                                <IonButton color="primary" expand="block" routerLink="/game">
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
