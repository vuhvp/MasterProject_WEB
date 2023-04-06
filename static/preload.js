export default function preload() {
  this.load.image('background', '/static/assets/background.png');
  this.load.image('ground', '/static/assets/ground-2.png');
  this.load.image('dino-idle', '/static/assets/fox.png');
  this.load.image('dino-hurt', '/static/assets/dino-hurt.png');
  this.load.image('restart', '/static/assets/restart.png');
  this.load.image('game-over', '/static/assets/game-over.png');

  this.load.spritesheet('dino', '/static/assets/fox-run.png', {
    frameWidth: 90,
    frameHeight: 90
  })

  this.load.image('obstacle-1', '/static/assets/ob-1.png')
  this.load.image('obstacle-2', '/static/assets/ob-2.png')
  this.load.image('obstacle-3', '/static/assets/ob-3.png')
  this.load.image('obstacle-4', '/static/assets/ob-4.png')
  this.load.image('obstacle-5', '/static/assets/ob-5.png')
  this.load.image('obstacle-6', '/static/assets/ob-6.png')
  this.load.spritesheet('obstacle-7', '/static/assets/ob-7.png', {
    frameWidth: 200,
    frameHeight: 200
  })
  this.load.spritesheet('obstacle-8', '/static/assets/ob-8.png', {
    frameWidth: 70,
    frameHeight: 70
  })
  this.load.spritesheet('obstacle-9', '/static/assets/ob-9.png', {
    frameWidth: 100,
    frameHeight: 80
  })
  this.load.spritesheet('obstacle-10', '/static/assets/ob-10.png', {
    frameWidth: 98,
    frameHeight: 86
  })
  this.load.spritesheet('obstacle-11', '/static/assets/ob-11.png', {
    frameWidth: 90,
    frameHeight: 90
  })

  this.load.plugin('rexcirclemaskimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcirclemaskimageplugin.min.js', true);
}
