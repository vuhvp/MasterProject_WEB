export default function preload() {
  this.load.audio('jump', '/static/assets/jump.m4a');
  this.load.audio('hit', '/static/assets/hit.m4a');
  this.load.audio('reach', '/static/assets/reach.m4a');

  this.load.image('ground', '/static/assets/ground.png');
  this.load.image('dino-idle', '/static/assets/dino-idle.png');
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

  this.load.spritesheet('dino', '/static/assets/dino-run.png', {
    frameWidth: 88,
    frameHeight: 94
  })

  this.load.spritesheet('dino-down', '/static/assets/dino-down.png', {
    frameWidth: 118,
    frameHeight: 94
  })

  this.load.spritesheet('enemy-bird', '/static/assets/enemy-bird.png', {
    frameWidth: 92,
    frameHeight: 77
  })

  this.load.image('obstacle-1', '/static/assets/cactuses_small_1.png')
  this.load.image('obstacle-2', '/static/assets/cactuses_small_2.png')
  this.load.image('obstacle-3', '/static/assets/cactuses_small_3.png')
  this.load.image('obstacle-4', '/static/assets/cactuses_big_1.png')
  this.load.image('obstacle-5', '/static/assets/cactuses_big_2.png')
  this.load.image('obstacle-6', '/static/assets/cactuses_big_3.png')
}
