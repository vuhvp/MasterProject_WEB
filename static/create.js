export default function create() {
    this.GAME_SPPED_SCALE_INCREASE = 0.000001
    this.SPAWN_INTERVAL_MIN = 1000
    this.SPAWN_INTERVAL_MAX = 2000

    this.isGameRunning = false
    this.gameSpeed = 10
    this.score = 0
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN
    this.faceChanged = false

    const { height, width } = this.game.config

    const background = this.add.image(width / 2, height / 2, 'background')
    background.setScale(0.625).setScrollFactor(0)
    this.startTrigger = this.physics.add.sprite(0, 100).setOrigin(0, 1).setImmovable()
    this.ground = this.add.tileSprite(0, height, width, 55, 'ground').setOrigin(0, 1)
    this.physics.add.existing(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.offset.y = +25
    this.scoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0)
    this.highScoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0).setAlpha(0)

    this.playerContainer = this.add.container(40, height - 200)
    this.playerContainer.setSize(36, 140);
    this.playerContainer.setDepth(1)
    this.physics.world.enable(this.playerContainer);
    this.playerContainer.body.setGravityY(5000).setCollideWorldBounds(true);

    // this.player = this.physics.add.sprite(0, 0, 'player-idle')
    this.player = this.physics.add.sprite(0, 0, 'girl', 'stationary.png');
    // this.player.displayHeight = 140
    // this.player.scaleX = this.player.scaleY;
    // this.player.setBodySize(this.dino.player / 2.5, this.player.height)
    // .setDepth(1)
    // .setCollideWorldBounds(true)
    // .setGravityY(5000)

    this.playerContainer.add(this.player)

    this.physics.add.collider(this.playerContainer, this.ground);
    // this.player = this.physics.add.sprite(0, height - 35, 'player-idle')
    //     .setOrigin(0, 1)
    //     .setDepth(1)
    //     .setCollideWorldBounds(true)
    //     .setGravityY(5000)
    // this.player.setBodySize(this.dino.width / 2.5, this.player.height)

    this.gameOverScreen = this.add.container(width / 2, height / 2).setAlpha(0)
    this.gameOverText = this.add.image(0, 0, 'game-over')
    this.restart = this.add.image(0, 90, 'restart').setAlpha(0)
    this.gameOverScreen.add([
        this.gameOverText, this.restart
    ]).setDepth(1)
    this.immovableObstacles = this.physics.add.group()
    this.movableObstacles = this.physics.add.group()

    initAnimations(this)
    initColliders(this)
    initStartTrigger(this)
    handleInputs(this)
    handleScore(this)
    var self = this
    this.socket = io('http://localhost:3000')

    this.socket.on('imageUri', function (base64) {
        const dataURI = `data:image/png;base64,${base64}`
        if (self.textures.exists('player-idle-2')) {
            self.textures.removeKey('player-idle-2')
            const face = self.playerContainer.getAt(1)
            self.playerContainer.removeAt(1, true)
        }
        self.textures.addBase64('player-idle-2', dataURI)

        self.textures.once('onload', function () {
            let x = self.player.texture.key == 'player-idle' ? 5 : 17
            const face = self.add.image(x, -20, 'player-idle-2');
            face.displayWidth = 50;
            face.scaleY = face.scaleX;
            self.playerContainer.add(face)
            self.faceChanged = true
        });
    })

}

function initAnimations(self) {
    self.anims.create({
        key: 'boy_running',
        frames: [
            { key: 'boy', frame: "1.png" },
            { key: 'boy', frame: "2.png" },
            { key: 'boy', frame: "3.png" },
            { key: 'boy', frame: "4.png" },
            { key: 'boy', frame: "5.png" },
            { key: 'boy', frame: "6.png" }
        ],
        frameRate: self.gameSpeed,
        repeat: -1
    })

    self.anims.create({
        key: 'girl_running',
        frames: [
            { key: 'girl', frame: "1.png" },
            { key: 'girl', frame: "2.png" },
            { key: 'girl', frame: "3.png" },
            { key: 'girl', frame: "4.png" },
            { key: 'girl', frame: "5.png" },
            { key: 'girl', frame: "6.png" }
        ],
        frameRate: self.gameSpeed,
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
    self.physics.add.collider(self.playerContainer, self.movableObstacles, () => {
        handleCollide(self)
    }, null, self)

    self.physics.add.collider(self.playerContainer, self.immovableObstacles, () => {
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
    self.gameSpeed = 10
    self.gameOverScreen.setAlpha(1)
    self.score = 0
    self.spawnTime = 700
    setTimeout(() => {
        self.restart.setAlpha(1)
    }, 500);
}

function initStartTrigger(self) {
    const { height } = self.game.config
    self.physics.add.overlap(self.startTrigger, self.playerContainer, () => {
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
                if (self.faceChanged) {
                    const face = self.playerContainer.getAt(1)
                    if (face.x == 5) {
                        face.x += 12
                    }
                }
                self.playerContainer.body.setVelocity(70)
                self.isGameRunning = true
                if (self.playerContainer.body.x >= 70) {
                    self.playerContainer.body.setVelocity(0)
                    startEvent.remove()
                }
            }
        })
    }, null, self)
}

function handleInputs(self) {
    self.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
            if (self.playerContainer.body.onFloor()) {
                self.playerContainer.body.setVelocityY(-1800)
            }
            if (self.restart.alpha === 1) {
                self.playerContainer.body.setVelocityY(0)
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