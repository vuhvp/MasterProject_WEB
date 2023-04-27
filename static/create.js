export default function create() {
    this.GAME_SPPED_SCALE_INCREASE = 0.000001
    this.SPAWN_INTERVAL_MIN = 1000
    this.SPAWN_INTERVAL_MAX = 2000

    this.isGameRunning = false
    this.gameSpeed = 10
    this.score = 0
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN
    this.faceChanged = false


    this.playerTouchingGround = true

    const { height, width } = this.game.config

    const background = this.add.image(width / 2, height / 2, 'background')
    background.setScale(0.625).setScrollFactor(0)
    // this.startTrigger = this.physics.add.sprite(0, 100).setOrigin(0, 1).setImmovable()
    // this.ground = this.add.tileSprite(0, height, width, 55, 'ground').setOrigin(0, 1)
    // this.physics.add.existing(this.ground);
    // this.ground.body.immovable = true;
    // this.ground.body.offset.y = +25
    // this.scoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0)
    // this.highScoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0).setAlpha(0)

    // this.playerContainer = this.add.container(40, height - 200)
    // this.playerContainer.setSize(36, 140);
    // this.playerContainer.setDepth(1)
    // this.physics.world.enable(this.playerContainer);
    // this.playerContainer.body.setGravityY(5000).setCollideWorldBounds(true);

    // this.player = this.physics.add.sprite(0, 0, 'player-idle')
    // // this.player.displayHeight = 140
    // // this.player.scaleX = this.player.scaleY;
    // // this.player.setBodySize(this.dino.player / 2.5, this.player.height)
    // // .setDepth(1)
    // // .setCollideWorldBounds(true)
    // // .setGravityY(5000)

    // this.playerContainer.add(this.player)

    // this.physics.add.collider(this.playerContainer, this.ground);
    // // this.player = this.physics.add.sprite(0, height - 35, 'player-idle')
    // //     .setOrigin(0, 1)
    // //     .setDepth(1)
    // //     .setCollideWorldBounds(true)
    // //     .setGravityY(5000)
    // // this.player.setBodySize(this.dino.width / 2.5, this.player.height)

    // this.gameOverScreen = this.add.container(width / 2, height / 2).setAlpha(0)
    // this.gameOverText = this.add.image(0, 0, 'game-over')
    // this.restart = this.add.image(0, 90, 'restart').setAlpha(0)
    // this.gameOverScreen.add([
    //     this.gameOverText, this.restart
    // ]).setDepth(1)
    // this.immovableObstacles = this.physics.add.group()
    // this.movableObstacles = this.physics.add.group()

    // initAnimations(this)
    // initColliders(this)
    // initStartTrigger(this)
    // handleInputs(this)
    // handleScore(this)
    // var self = this
    // this.socket = io('http://localhost:3000')

    // this.socket.on('imageUri', function (base64) {
    //     const dataURI = `data:image/png;base64,${base64}`
    //     if (self.textures.exists('player-idle-2')) {
    //         self.textures.removeKey('player-idle-2')
    //         const face = self.playerContainer.getAt(1)
    //         self.playerContainer.removeAt(1, true)
    //     }
    //     self.textures.addBase64('player-idle-2', dataURI)

    //     self.textures.once('onload', function () {
    //         let x = self.player.texture.key == 'player-idle' ? 5 : 17
    //         const face = self.add.image(x, -20, 'player-idle-2');
    //         face.displayWidth = 50;
    //         face.scaleY = face.scaleX;
    //         self.playerContainer.add(face)
    //         self.faceChanged = true
    //     });
    // })


    this.shapes = this.cache.json.get('shapes');
    console.log(this.shapes);
    this.matter.world.setBounds(0, 0, width, height - 35);

    // this.ground = this.matter.add.sprite(0, height, 'sheet', 'ground.png', { shape: shapes.ground })
    // this.ground.setDisplaySize(width, 55).setOrigin(0, 1)
    // this.platform = this.add.tileSprite(0, height, width, 55, 'platform').setOrigin(0, 1)
    // this.platform.body.immovable = true;
    // this.platform.body.offset.y = +25

    // this.matter.add.gameObject(this.platform)
    // this.matter.add.image(0, height, 'platform', null, { isStatic: true }).setOrigin(0, 1)

    //Place ground object
    // this.ground = this.matter.add.sprite(0, 0, 'sheet', 'ground.png', { shape: shapes.ground, render: { sprite: { yOffset: 0.2 } } });
    // //Ground is 600x600, so double the x pixels and we get screen width
    // this.ground.setScale(2, 1);
    // this.ground.setPosition(1200, 435);
    //Let the ground detect collisions 
    // ground.isSensor(true);



    this.ground = this.add.tileSprite(0, height, width, 55, 'platform').setOrigin(0, 1)
    // this.physics.add.existing(this.ground);
    // this.ground.body.immovable = true;
    // this.ground.body.offset.y = +25


    // ground.setStatic(true).setOrigin(0)
    // ground.setOrigin(0, 1)
    // ground.setPosition(800, height - 25)
    // console.log(ground);
    this.player = this.matter.add.sprite(20, 200, 'sheet', 'girl0000.png', {
        shape: this.shapes.girl0000
    });
    this.player.setScale(1).setFixedRotation()

    this.trigger = this.matter.add.sprite(40, 100).setOrigin(0, 1).setIgnoreGravity(true).setSensor(true)
    this.trigger.body.label = 'trigger'

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    this.matter.world.on("collisionstart", (e, body1, body2) => {
        console.log(body1.label, body2.label)
        // playertouchingground = true;
        // if (body1.label === 'Rectangle Body' && body2.label == 'player') {
        //     console.log('ok');
        // }
        // handleCollision(this, body1.label, body2.label)
    });

    this.matter.world.on("collisionactive", (e, body1, body2) => {
        console.log(body1.label, body2.label)
        // playertouchingground = true;
        // if (body1.label === 'Rectangle Body' && body2.label == 'player') {
        //     console.log('ok');
        // }
        handleCollision(this, body1.label, body2.label)
    });


    this.matter.world.on("collisionend", (e, o1, o2) => {
        // console.log('end');
        // playertouchingground = false;
    })

    // this.matter.add.sprite(200, 50, 'sheet', 'ob-1.png', { shape: shapes['ob-1'] });
    // this.matter.add.sprite(250, 250, 'sheet', 'ob-2.png', { shape: shapes['ob-2'] });
    // this.matter.add.sprite(360, 50, 'sheet', 'ob-3.png', { shape: shapes['ob-3'] });
    // this.matter.add.sprite(400, 250, 'sheet', 'ob-4.png', { shape: shapes['ob-4'] });
    initAnimations(this)
    this.player.on('animationupdate', (anim, frame, gameObject) => {

        var sx = gameObject.x;
        var sy = gameObject.y;
        var sav = gameObject.body.angularVelocity;
        var sv = gameObject.body.velocity;

        let nextFrameId = frame.nextFrame.textureFrame.slice(0, frame.nextFrame.textureFrame.indexOf('.')); // get next frame id
        let nextShape = this.shapes[nextFrameId]; // get next shape

        /* These 2 methods must be run because:
        1`) Before change body if we scaled before our sprite we must set the scale to the start value
        */
        gameObject.setScale(1.5);


        gameObject.setBody(nextShape, { shape: this.shapes[nextFrameId] }); // set new  shape

        gameObject.setPosition(sx, sy);
        gameObject.setVelocity(sv.x, sv.y);
        gameObject.setAngularVelocity(sav);
        gameObject.setScale(1); //again scale
    })
}

function initAnimations(self) {
    self.anims.create({
        key: 'running',
        frames: [
            { key: 'player-running', frame: "boy-running-1.png" },
            { key: 'player-running', frame: "boy-running-2.png" },
            { key: 'player-running', frame: "boy-running-3.png" },
            { key: 'player-running', frame: "boy-running-4.png" },
            { key: 'player-running', frame: "boy-running-5.png" },
            { key: 'player-running', frame: "boy-running-6.png" }
        ],
        frameRate: self.gameSpeed,
        repeat: -1
    })

    self.anims.create({
        key: 'girl-running',
        frames: self.anims.generateFrameNames("sheet", { prefix: 'girl000', suffix: '.png', start: 1, end: 6 }),
        frameRate: 5,
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

function handleCollision(self, label1, label2) {
    if (label1 === 'player' && label2 == 'trigger') {
        startGame(self)
    }
}

function startGame(self) {
    const { height } = self.game.config
    if (self.trigger.y == 100) {
        self.trigger.setY(height - 55)
        return
    }
    // self.trigger.disableBody(true, true)
    const startEvent = self.time.addEvent({
        delay: 10,
        loop: true,
        callbackScope: self,
        callback: () => {
            if (self.faceChanged) {
                const face = self.playerContainer.getAt(1)
                if (face.x == 5) {
                    face.x += 12
                }
            }
            // self.playerContainer.body.setVelocity(70)
            // self.player.setVelocityX(1, 0)
            self.isGameRunning = true
            // if (self.player.x >= 140) {
            //     console.log('x > 70');
            //     // self.player.setVelocityX(0)
            //     startEvent.remove()
            // }
            startEvent.remove()
        }
    })
}

function handleInputs(self) {
    if (self.spacebar.isDown) {
        // if (self.playerContainer.body.onFloor()) {
        //     self.playerContainer.body.setVelocityY(-1800)
        // }
        // if (self.restart.alpha === 1) {
        //     self.playerContainer.body.setVelocityY(0)
        //     self.physics.resume()
        //     self.immovableObstacles.clear(true, true)
        //     self.movableObstacles.clear(true, true)
        //     self.isGameRunning = true
        //     self.gameOverScreen.setAlpha(0)
        //     self.anims.resumeAll()
        //     self.restart.setAlpha(0)
        // }
    }
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