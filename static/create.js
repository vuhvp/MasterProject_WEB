export default function create() {
    this.GAME_SPPED_SCALE_INCREASE = 0.000001
    this.SPAWN_INTERVAL_MIN = 1000
    this.SPAWN_INTERVAL_MAX = 2000

    this.isGameRunning = false
    this.gameSpeed = 10
    this.score = 0
    this.isGameOver = false
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN

    const { height, width } = this.game.config

    const background = this.add.image(width / 2, height / 2, 'background')
    background.setScale(0.625).setScrollFactor(0)
    this.startTrigger = this.physics.add.sprite(0, 100).setOrigin(0, 1).setImmovable()
    this.ground = this.add.tileSprite(0, height, width, 55, 'ground').setOrigin(0, 1)
    this.physics.add.existing(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.offset.y = +25
    this.scoreText = this.add.text(width, 0, '00000', { fill: "#535353", font: '900 35px Courier', resolution: 5 }).setOrigin(1, 0)
    this.highScoreText = this.add.text(width, 0, '00000', { fill: "#535353", font: '900 35px Courier', resolution: 5 }).setOrigin(1, 0).setAlpha(0)
    this.dino = this.physics.add.sprite(0, height - 35, 'dino-idle')
        .setOrigin(0, 1)
        .setDepth(1)
        .setCollideWorldBounds(true)
        .setGravityY(5000)

    this.dino.setBodySize(this.dino.width / 2.5, this.dino.height)

    this.gameOverScreen = this.add.container(width / 2, height / 2).setAlpha(0)
    this.gameOverText = this.add.image(0, 0, 'game-over')
    this.restart = this.add.image(0, 80, 'restart').setAlpha(0)
    this.gameOverScreen.add([
        this.gameOverText, this.restart
    ]).setDepth(1)
    this.immovableObstacles = this.physics.add.group()
    this.movableObstacles = this.physics.add.group()
    this.physics.add.collider(this.dino, this.ground);
    initAnimations(this)
    initColliders(this)
    initStartTrigger(this)
    handleInputs(this)
    handleScore(this)
}

function initAnimations(self) {
    self.anims.create({
        key: 'dino-run',
        frames: self.anims.generateFrameNumbers('dino', { start: 0, end: 8 }),
        frameRate: self.gameSpeed,
        repeat: -1
    })

    self.anims.create({
        key: 'dino-fly',
        frames: self.anims.generateFrameNumbers('enemy-bird', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    })

    self.anims.create({
        key: 'obstacle-anim-7',
        frames: self.anims.generateFrameNumbers('obstacle-7', { start: 0, end: 7 }),
        frameRate: 9,
        repeat: -1
    })

    self.anims.create({
        key: 'obstacle-anim-8',
        frames: self.anims.generateFrameNumbers('obstacle-8', { start: 0, end: 5 }),
        frameRate: 9,
        repeat: -1
    })

    self.anims.create({
        key: 'obstacle-anim-9',
        frames: self.anims.generateFrameNumbers('obstacle-9', { start: 0, end: 8 }),
        frameRate: 5,
        repeat: -1
    })

    self.anims.create({
        key: 'obstacle-anim-10',
        frames: self.anims.generateFrameNumbers('obstacle-10', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: -1
    })

    self.anims.create({
        key: 'obstacle-anim-11',
        frames: self.anims.generateFrameNumbers('obstacle-11', { start: 0, end: 7 }),
        frameRate: 15,
        repeat: -1
    })
}

function initColliders(self) {
    self.physics.add.collider(self.dino, self.movableObstacles, () => {
        handleCollide(self)
    }, null, self)

    self.physics.add.collider(self.dino, self.immovableObstacles, () => {
        handleCollide(self)
    }, null, self)
}

function handleCollide(self) {
    self.highScoreText.x = self.scoreText.x - self.scoreText.width - 20;

    const highScore = self.highScoreText.text.substr(self.highScoreText.text.length - 5);
    const newScore = Number(self.scoreText.text) > Number(highScore) ? self.scoreText.text : highScore;

    self.highScoreText.setText('HI ' + newScore);
    self.highScoreText.setAlpha(1);

    self.physics.pause()
    self.isGameRunning = false
    self.anims.pauseAll()
    // self.dino.setTexture('dino-hurt');
    self.gameSpeed = 10
    self.gameOverScreen.setAlpha(1)
    self.score = 0
    self.spawnTime = 700
    setTimeout(() => {
        self.restart.setAlpha(1)
    }, 500);
}
function initStartTrigger(self) {
    const { width, height } = self.game.config
    self.physics.add.overlap(self.startTrigger, self.dino, () => {
        if (self.startTrigger.y == 100) {
            self.startTrigger.body.reset(0, height)
            return
        }
        self.startTrigger.disableBody(true, true)
        const startEvent = self.time.addEvent({
            delay: 1000 / 60,
            loop: true,
            callbackScope: self,
            callback: () => {
                self.dino.play('dino-run', 1)
                self.dino.setVelocity(70)
                self.isGameRunning = true
                if (self.dino.x >= 70) {
                    self.dino.setVelocity(0)
                    startEvent.remove()
                }
            }
        })
    }, null, self)
}

function handleInputs(self) {
    self.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
            if (self.dino.body.onFloor()) {
                self.dino.setVelocityY(-1700)
            }
            if (self.restart.alpha === 1) {
                self.dino.setVelocityY(0)
                self.physics.resume()
                self.immovableObstacles.clear(true, true)
                self.movableObstacles.clear(true, true)
                self.isGameRunning = true
                self.gameOverScreen.setAlpha(0)
                self.anims.resumeAll()
                self.restart.setAlpha(0)
            }
        }
    })
}

function handleScore(self) {
    self.time.addEvent({
        delay: 1000 / 10,
        loop: true,
        callbackScope: self,
        callback: () => {
            if (!self.isGameRunning) return
            self.score++
            const score = Array.from(String(self.score), Number)
            for (let i = 0; i < 5 - String(self.score).length; i++) {
                score.unshift(0)
            }
            self.scoreText.setText(score.join(''))
        }
    })
}