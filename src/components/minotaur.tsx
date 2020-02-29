import React, { useRef } from 'react';
import Phaser, { Game, Types, Scene, GameObjects } from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import './minotaur.scss';

const Minotaur = () => {
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

    return (
        <div>
            <IonPhaser game={game.current as Game} />
            <button
                onClick={() => {
                    minotaur.current?.anims.play('idle');
                }}>
                IDLE
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('move');
                }}>
                Move
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('taunt');
                }}>
                Taunt
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('attack1');
                }}>
                Attack1
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('attack2');
                }}>
                Attack2
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('attack3');
                }}>
                Attack3
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('attack4');
                }}>
                Attack4
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('damage1');
                }}>
                Damage1
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('damage2');
                }}>
                Damage2
            </button>
            <button
                onClick={() => {
                    minotaur.current?.anims.play('death');
                }}>
                Death
            </button>
        </div>
    );
};

export { Minotaur };
