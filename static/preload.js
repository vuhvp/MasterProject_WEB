export default function preload() {
  this.load.image('background', '/static/assets/background.png');
  this.load.image('ground', '/static/assets/ground.png');
  this.load.image('restart', '/static/assets/restart.png');
  this.load.image('restart1', '/static/assets/restart-1.png');
  this.load.image('gameover', '/static/assets/game_over.png');

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

  this.load.atlas("boy_sprites", "/static/assets/boy/sprites.png", "/static/assets/boy/sprites.json")
  this.load.atlas("girl_sprites", "/static/assets/girl/sprites.png", "/static/assets/girl/sprites.json")
  this.load.atlas("obstacle", "/static/assets/obstacle/obstacle.png", "/static/assets/obstacle/obstacle.json")


  this.load.json('boy_shapes', '/static/assets/boy/shapes.json');
  this.load.json('girl_shapes', '/static/assets/girl/shapes.json');
  this.load.json('obstacle_shapes', '/static/assets/obstacle_shapes.json');

}
