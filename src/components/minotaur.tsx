import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import Phaser, { Game, Types, Scene, GameObjects } from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import './minotaur.scss';

type MinotaurAction =
    | 'idle'
    | 'move'
    | 'attack1'
    | 'attack2'
    | 'attack3'
    | 'attack4'
    | 'damage1'
    | 'damage2'
    | 'death';

export type MinotaurRef = {
    do: (action: MinotaurAction) => void;
};

type MinotaurProps = {};

const Minotaur = (_: MinotaurProps, ref: Ref<MinotaurRef>) => {
    const minotaur = useRef<GameObjects.Sprite>();
    const game = useRef<Types.Core.GameConfig>({
        type: Phaser.AUTO,
        width: 96,
        height: 96,
        transparent: true,
        scene: {
            preload: function(this: Scene) {
                this.load.spritesheet('minotaur', 'assets/minotaur.png', {
                    frameWidth: 96,
                    frameHeight: 96
                });
                this.load.animation('minotaurAnims', 'assets/minotaur-config.json');
            },
            create: function(this: Scene) {
                minotaur.current = this.add.sprite(48, 48, 'minotaur');
            }
        }
    });

    useImperativeHandle(ref, () => ({
        do: (action: MinotaurAction) => {
            minotaur.current?.anims.play(action);
        }
    }));

    return <IonPhaser game={game.current as Game} />;
};

const MinotaurForwardRef = forwardRef<MinotaurRef, MinotaurProps>(Minotaur);

export { MinotaurForwardRef as Minotaur };
