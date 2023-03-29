export default function create() {
    this.GAME_SPPED_SCALE_INCREASE = 0.000001
    this.SPAWN_INTERVAL_MIN = 1000
    this.SPAWN_INTERVAL_MAX = 2000

    this.isGameRunning = false
    this.gameSpeed = 10
    this.respawnTime = 1000
    this.score = 0
    this.isGameOver = false
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN

    const { height, width } = this.game.config

    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable()
    this.ground = this.add.tileSprite(0, height, 88, 26, 'ground').setOrigin(0, 1)
    this.scoreText = this.add.text(width, 0, '00000', { fill: "#535353", font: '900 35px Courier', resolution: 5 }).setOrigin(1, 0)
    this.highScoreText = this.add.text(width, 0, '00000', { fill: "#535353", font: '900 35px Courier', resolution: 5 }).setOrigin(1, 0).setAlpha(0)
    this.dino = this.physics.add.sprite(0, height, 'dino-idle')
        .setOrigin(0, 1)
        .setDepth(1)
        .setCollideWorldBounds(true)
        .setGravityY(5000)


    this.dino.setBodySize(44, 92)

    this.gameOverScreen = this.add.container(width / 2, height / 2).setAlpha(0)
    this.gameOverText = this.add.image(0, 0, 'game-over')
    this.restart = this.add.image(0, 80, 'restart').setAlpha(0)
    this.gameOverScreen.add([
        this.gameOverText, this.restart
    ]).setDepth(1)
    this.obstacles = this.physics.add.group()

    initAnimations(this)
    initColliders(this)
    initStartTrigger(this)
    handleInputs(this)
    handleScore(this)
}

function initAnimations(self) {
    self.anims.create({
        key: 'dino-run',
        frames: self.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
        frameRate: self.gameSpeed,
        repeat: -1
    })

    self.anims.create({
        key: 'dino-fly',
        frames: self.anims.generateFrameNumbers('enemy-bird', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    })
}

function initColliders(self) {
    self.physics.add.collider(self.dino, self.obstacles, () => {
        self.highScoreText.x = self.scoreText.x - self.scoreText.width - 20;

        const highScore = self.highScoreText.text.substr(self.highScoreText.text.length - 5);
        const newScore = Number(self.scoreText.text) > Number(highScore) ? self.scoreText.text : highScore;

        self.highScoreText.setText('HI ' + newScore);
        self.highScoreText.setAlpha(1);

        self.physics.pause()
        self.isGameRunning = false
        self.anims.pauseAll()
        self.dino.setTexture('dino-hurt');
        self.respawnTime = 0
        self.gameSpeed = 10
        self.gameOverScreen.setAlpha(1)
        self.score = 0
        self.spawnTime = 700
        setTimeout(() => {
            self.restart.setAlpha(1)
        }, 500);
    }, null, self)
}

function initStartTrigger(self) {
    const { width, height } = self.game.config
    self.physics.add.overlap(self.startTrigger, self.dino, () => {
        if (self.startTrigger.y == 10) {
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
                self.dino.setVelocityX(70)

                if (self.ground.width < width) {
                    self.ground.width += 18 * 2
                }

                if (self.ground.width >= width) {
                    self.ground.width = width
                    self.isGameRunning = true
                    self.dino.setVelocity(0)
                    startEvent.remove()
                }
            }
        })
    }, null, self)
}

function handleInputs(self) {
    self.input.keyboard.on('keydown', (event) => {
        console.log('alo');
        if (event.keyCode === 32) {
            if (self.dino.body.onFloor()) {
                self.dino.setVelocityY(-1600)
            }
            if (self.restart.alpha === 1) {
                self.dino.setVelocityY(0)
                self.physics.resume()
                self.obstacles.clear(true, true)
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


