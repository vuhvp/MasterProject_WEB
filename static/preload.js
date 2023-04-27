export default function preload() {
  this.load.image('background', '/static/assets/background.png');
  this.load.image('platform', '/static/assets/ground.png');
  this.load.image('restart', '/static/assets/restart.png');
  this.load.image('game-over', '/static/assets/game-over.png');

  // this.load.image('obstacle-1', '/static/assets/ob1.png')
  // this.load.image('obstacle-2', '/static/assets/ob2.png')
  // this.load.image('obstacle-3', '/static/assets/ob3.png')
  // this.load.image('obstacle-4', '/static/assets/ob4.png')
  // this.load.image('obstacle-5', '/static/assets/ob5.png')
  // this.load.image('obstacle-6', '/static/assets/ob6.png')
  // this.load.spritesheet('obstacle-7', '/static/assets/ob-7.png', {
  //   frameWidth: 200,
  //   frameHeight: 200
  // })
  // this.load.spritesheet('obstacle-8', '/static/assets/ob-8.png', {
  //   frameWidth: 70,
  //   frameHeight: 70
  // })
  // this.load.spritesheet('obstacle-9', '/static/assets/ob-9.png', {
  //   frameWidth: 100,
  //   frameHeight: 80
  // })
  // this.load.spritesheet('obstacle-10', '/static/assets/ob-10.png', {
  //   frameWidth: 98,
  //   frameHeight: 86
  // })
  // this.load.spritesheet('obstacle-11', '/static/assets/ob-11.png', {
  //   frameWidth: 90,
  //   frameHeight: 90
  // })

  // this.load.image('player-idle', '/static/assets/boy/boy-idle.png');
  // this.load.atlas("player-running", "/static/assets/boy/boy.png", "/static/assets/boy/boy.json")

  // Load sprite sheet generated with TexturePacker
  this.load.atlas('sheet', '/static/assets/sprite.png', '/static/assets/sprite.json');

  // Load body shapes from JSON file generated using PhysicsEditor
  this.load.json('shapes', '/static/assets/shapes.json');
}
