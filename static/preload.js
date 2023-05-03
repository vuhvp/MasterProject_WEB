export default function preload() {
  this.load.image('background', '/static/assets/background.png');
  this.load.image('ground', '/static/assets/ground.png');
  this.load.image('restart', '/static/assets/restart.png');
  this.load.image('game-over', '/static/assets/game_over.png');

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

  this.load.image('player-idle', '/static/assets/boy/boy-idle.png');
  this.load.atlas("player-running", "/static/assets/boy/boy.png", "/static/assets/boy/boy.json")


  this.load.atlas("boy", "/static/assets/boy.png", "/static/assets/boy.json")
  this.load.atlas("girl", "/static/assets/girl.png", "/static/assets/girl.json")
  this.load.atlas("obstacle", "/static/assets/obstacle.png", "/static/assets/obstacle.json")
}
