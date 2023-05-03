import preload from './preload.js'
import create from './create.js'
import update from './update.js'

const config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 1200,
    height: 450,
    pixelArt: true,
    transparent: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config)