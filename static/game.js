import preload from './preload.js'
import create from './create.js'
import update from './update.js'

const config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    pixelArt: true,
    transparent: true,
    // fps: { forceSetTimeOut: true, target: 60 }, 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config)