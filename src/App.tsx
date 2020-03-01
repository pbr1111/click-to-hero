import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router';
import { Loader } from './components/loader';
import { LevelProvider } from './contexts/level-context';
import './config/i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
/* Theme variables */
import './theme/variables.css';

const HomePage = lazy(() => import('./pages/home'));
const GamePage = lazy(() => import('./pages/game'));

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Suspense fallback={<Loader />}>
                    <LevelProvider>
                        <Route path="/home" component={HomePage} exact />
                        <Route path="/game" component={GamePage} exact />
                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                    </LevelProvider>
                </Suspense>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
