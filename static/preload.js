export default function preload() {
  this.load.audio('jump', '/static/assets/jump.m4a');
  this.load.audio('hit', '/static/assets/hit.m4a');
  this.load.audio('reach', '/static/assets/reach.m4a');

  this.load.image('background', '/static/assets/background.png');
  this.load.image('ground', '/static/assets/ground-2.png');
  this.load.image('dino-idle', '/static/assets/fox.png');
  this.load.image('dino-hurt', '/static/assets/dino-hurt.png');
  this.load.image('restart', '/static/assets/restart.png');
  this.load.image('game-over', '/static/assets/game-over.png');
  this.load.image('cloud', '/static/assets/cloud.png');

  this.load.spritesheet('star', '/static/assets/stars.png', {
    frameWidth: 9, frameHeight: 9
  });

  this.load.spritesheet('moon', '/static/assets/moon.png', {
    frameWidth: 20, frameHeight: 40
  });

  this.load.spritesheet('dino', '/static/assets/fox-run.png', {
    frameWidth: 90,
    frameHeight: 90
  })

  this.load.spritesheet('dino-down', '/static/assets/dino-down.png', {
    frameWidth: 118,
    frameHeight: 94
  })

  this.load.spritesheet('enemy-bird', '/static/assets/enemy-bird.png', {
    frameWidth: 92,
    frameHeight: 77
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
}
