import React from 'react';
import { IonLoading } from '@ionic/react';

const Loader = () => (
    <IonLoading isOpen showBackdrop={false} mode="ios" translucent spinner="crescent" />
);

export { Loader };
