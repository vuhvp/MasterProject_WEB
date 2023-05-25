let self
export default function create() {
    self = this
    this.GAME_HEIGHT = this.game.config.height
    this.GAME_SPEED = 12
    this.GAME_SPPED_SCALE_INCREASE = 0.000001
    this.SPAWN_INTERVAL_MIN = 1000
    this.SPAWN_INTERVAL_MAX = 2000
    this.GROUND_HEIGHT = 38
    this.JUMP_VELOCITY = -50

    const roomId = makeid(6)
    setSessionId(roomId)


    this.isGameRunning = false
    this.gameSpeed = this.GAME_SPEED
    this.score = 0
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN
    this.faceChanged = false
    this.playerTouchingGround = true
    this.countFrame = 10
    this.isBoy = true

    const { height, width } = this.game.config

    const background = this.add.image(width / 2, height / 2, 'background')
    background.setScale(0.8).setScrollFactor(0)

    this.scoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0)
    this.highScoreText = this.add.text(width, 0, '00000', { fill: "#ffff2e", stroke: '#e85b8f', strokeThickness: 8, font: '900 35px Courier', resolution: 10 }).setOrigin(1, 0).setAlpha(0)


    initAnimations.apply(this)
    updateScore.apply(this)

    this.gameoverContainer = this.add.container(width / 2, height / 2).setAlpha(0)
    this.gameoverText = this.add.image(0, 0, 'gameover')
    this.restart = this.add.image(0, 90, 'restart').setAlpha(0)
    this.gameoverContainer.add([
        this.gameoverText, this.restart
    ]).setDepth(1)

    this.socket = io('http://localhost:3000')

    this.socket.emit('join', roomId)

    this.socket.on('imageUri', (base64) => {
        const dataURI = `data:image/png;base64,${base64}`
        if (this.textures.exists('face')) {
            this.textures.removeKey('face')
        }
        this.textures.addBase64('face', dataURI)
        this.textures.once('onload', () => {
            this.face.setAlpha(1)
            this.face.setTexture('face')
            this.face.displayWidth = 50
            this.face.scaleY = this.face.scaleX;
        });
    })

    this.boy_shapes = this.cache.json.get('boy_shapes');
    this.girl_shapes = this.cache.json.get('girl_shapes');
    this.obstacle_shapes = this.cache.json.get('obstacle_shapes');

    this.matter.world.setBounds(0, 0, width, height, 0, false, true, true, true);

    this.trigger = this.matter.add.sprite(100, 100).setOrigin(0.5).setIgnoreGravity(true).setSensor(true)
    this.trigger.body.label = 'trigger'

    this.ground = this.add.tileSprite(0, height, width, 55, "ground").setOrigin(0, 1);
    this.groundBody = this.matter.add.rectangle(width / 2, this.GAME_HEIGHT - (this.GROUND_HEIGHT / 2), width, this.GROUND_HEIGHT, { isStatic: true, label: 'ground' }, { friction: 1 });

    this.player = this.matter.add.sprite(100, height - this.GROUND_HEIGHT - 70, 'boy_sprites', 'stationary', { label: 'player' })
    this.player.setBody(this.boy_shapes['stationary'])
    this.player.setFixedRotation();
    this.player.setBounce(0);


    this.events.on('postupdate', () => {
        this.face.x = this.player.x + 6;
        if (this.isBoy) {
            this.face.y = this.player.y - 25;
        }
        else {
            this.face.y = this.player.y - 20;
        }
    });

    this.face = this.add.image(0, 0, 'restart1').setAlpha(0)


    this.categories = {
        ground: 0x0001,
        player: 0x0002,
        obstacle: 0x0003,
        trigger: 0x0004
    };

    this.groundBody.collisionFilter.category = this.categories.ground;

    this.player.setCollisionCategory(this.categories.player);
    this.trigger.setCollisionCategory(this.categories.trigger)

    this.player.setCollidesWith([this.categories.ground, this.categories.trigger, this.categories.obstacle]);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    this.player.on('animationupdate', (anim, frame, gameObject) => {
        const frameId = frame.textureFrame
        this.player.setBody(this.boy_shapes[frameId], { chamfer: 50 });
        this.player.setFixedRotation();
        this.player.setBounce(0);
        this.player.setPosition(100, 500)
    })


    this.matter.world.on("collisionstart", (event) => {
        event.pairs.forEach((pair) => {
            const bodyA = pair.bodyA;
            const bodyB = pair.bodyB;
            if ((bodyA.label === "player" && bodyB.label === "ground") || (bodyA.label === "ground" && bodyB.label === "player")) {
                this.playerTouchingGround = true
            }
            if ((bodyA.label === "player" && bodyB.label === "trigger") || (bodyA.label === "trigger" && bodyB.label === "player")) {
                startGame.apply(this)
            }
            if ((bodyA.label === "player" && bodyB.label === "obstacle") || (bodyA.label === "obstacle" && bodyB.label === "player")) {
                stopGame.apply(this)
            }
        });
    });

    this.immovableObstacles = this.add.group()
    this.movableObstacles = this.add.group()

}

function startGame() {
    document.querySelectorAll("input[name='gender']").forEach((input) => {
        input.disabled = true
    });
    const startEvent = this.time.addEvent({
        delay: 100,
        loop: true,
        callbackScope: this,
        callback: () => {
            this.isGameRunning = true
            this.player.play(this.isBoy ? 'boy_running' : 'girl_running')
            this.trigger.destroy()
            startEvent.remove()
        }
    })
}

function stopGame() {
    this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;
    const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
    const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;
    this.highScoreText.setText('HI ' + newScore);
    this.highScoreText.setAlpha(1);

    this.matter.world.enabled = false
    this.isGameRunning = false
    this.anims.pauseAll()
    this.gameoverContainer.setAlpha(1)
    setTimeout(() => {
        this.restart.setAlpha(1)
    }, 500);
}



function initAnimations() {
    this.anims.create({
        key: 'boy_running',
        frames: [
            { key: 'boy_sprites', frame: "1" },
            { key: 'boy_sprites', frame: "2" },
            { key: 'boy_sprites', frame: "3" },
            { key: 'boy_sprites', frame: "4" },
            { key: 'boy_sprites', frame: "5" },
            { key: 'boy_sprites', frame: "6" }
        ],
        frameRate: this.gameSpeed - this.gameSpeed * 0.2,
        repeat: -1,
    })

    this.anims.create({
        key: 'girl_running',
        frames: [
            { key: 'girl_sprites', frame: "1" },
            { key: 'girl_sprites', frame: "2" },
            { key: 'girl_sprites', frame: "3" },
            { key: 'girl_sprites', frame: "4" },
            { key: 'girl_sprites', frame: "5" },
            { key: 'girl_sprites', frame: "6" }
        ],
        frameRate: this.gameSpeed - this.gameSpeed * 0.2,
        repeat: -1
    })

    this.anims.create({
        key: 'obstacle-anim-7',
        frames: this.anims.generateFrameNumbers('obstacle-7', { start: 0, end: 7 }),
        frameRate: 9,
        repeat: -1
    })

    this.anims.create({
        key: 'obstacle-anim-8',
        frames: this.anims.generateFrameNumbers('obstacle-8', { start: 0, end: 5 }),
        frameRate: 9,
        repeat: -1
    })

    this.anims.create({
        key: 'obstacle-anim-9',
        frames: this.anims.generateFrameNumbers('obstacle-9', { start: 0, end: 8 }),
        frameRate: 5,
        repeat: -1
    })

    this.anims.create({
        key: 'obstacle-anim-10',
        frames: this.anims.generateFrameNumbers('obstacle-10', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: -1
    })

    this.anims.create({
        key: 'obstacle-anim-11',
        frames: this.anims.generateFrameNumbers('obstacle-11', { start: 0, end: 7 }),
        frameRate: 15,
        repeat: -1
    })
}

function updateScore() {
    this.time.addEvent({
        delay: 1000 / 10,
        loop: true,
        callbackScope: this,
        callback: () => {
            if (!this.isGameRunning) return
            this.score++
            const score = Array.from(String(this.score), Number)
            for (let i = 0; i < 5 - String(this.score).length; i++) {
                score.unshift(0)
            }
            this.scoreText.setText(score.join(''))
        }
    })
}

function onCharacterChange() {
    if (this.isGameRunning) return

    if (this.isBoy) {
        this.player.setTexture('boy_sprites', 'stationary')
        this.player.setBody(this.boy_shapes['stationary'])
    }
    else {
        this.player.setTexture('girl_sprites', 'stationary')
        this.player.setBody(this.girl_shapes['stationary'])
    }
    this.player.setFixedRotation();
    this.player.setBounce(0);
}

function onInputChange(event) {
    const value = event.target.value
    self.isBoy = value === 'boy'
    onCharacterChange.apply(self)
}

document.querySelectorAll("input[name='gender']").forEach((input) => {
    input.addEventListener('click', onInputChange);
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function setSessionId(id) {
    document.getElementById('session').innerHTML = id;
}
