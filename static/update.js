export default function update(time, delta) {
    if (this.countFrame > 0) {
        this.countFrame--
        if (this.countFrame == 0) {
            delta > 10 ? updateGameSetting.apply(this, [10, -50]) : updateGameSetting.apply(this, [2.5, -26])
        }
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        if (this.playerTouchingGround) {
            this.playerTouchingGround = false
            this.player.setVelocityY(this.JUMP_VELOCITY);
            this.player.stop()
        }
        if (this.restart.alpha === 1) {
            restartGame.apply(this)
        }
    }
    if (!this.isGameRunning) return
    const increasement = this.gameSpeed * delta * 0.05
    updateGround.apply(this, [increasement])
    updateObstacle.apply(this, [delta, increasement])
    updatePlayer.apply(this)
    updateGameSpeed.apply(this, [delta])

}

function updateGround(increasement) {
    this.ground.tilePositionX += increasement
}

function updateObstacle(delta, increasement) {

    // const sprites = this.immovableObstacles.getChildren();
    // console.log(sprites, 'spite');
    // for (let i = 0; i < sprites.length; i++) {
    //     const sprite = sprites[i];
    //     Matter.Body.setPosition(sprite, { x: sprite.position.x, y: sprite.position.y + ((increasement + 0.5) * -1) });
    // }
    Phaser.Actions.IncX(this.immovableObstacles.getChildren(), (increasement + 0.5) * -1)

    // Phaser.Actions.IncX(self.movableObstacles.getChildren(), (increasement + 0.5) * -1)
    // Phaser.Actions.IncX(self.immovableObstacles.getChildren(), increasement * -1)
    // const merged = self.immovableObstacles.getChildren().concat(self.movableObstacles.getChildren());
    // merged.forEach(obstacle => {
    //     if (obstacle.getBounds().right < 0) {
    //         obstacle.destroy()
    //     }
    // })
    const children = this.matter.world.getAllBodies()
    // console.log(children, 'children');
    if (this.nextSpawnTime <= 0) {
        placeObstacle.apply(this)
        this.nextSpawnTime = randomNumber(this.SPAWN_INTERVAL_MIN, this.SPAWN_INTERVAL_MAX) / (this.gameSpeed / 10)
    }
    this.nextSpawnTime -= delta
}

function updatePlayer() {
    if (this.playerTouchingGround && !this.player.anims.isPlaying) this.player.play(this.isBoy ? 'boy_running' : 'girl_running')

}

function updateGameSpeed(delta) {
    this.gameSpeed += delta * this.GAME_SPPED_SCALE_INCREASE
}

function placeObstacle() {
    const { width, height } = this.game.config
    // const obstacleNum = Math.floor(Math.random() * 11) + 1
    const obstacleNum = Math.floor(Math.random() * 6) + 1
    let obstacle
    // console.log(obstacleNum, 'obstacleNum');
    // let detail = getObstacleDetail(obstacleNum)

    // if (detail.ismovable) {
    //     obstacle = self.movableObstacles.create(width, height - detail.height_offset, `obstacle-${obstacleNum}`)
    // }
    // else {
    //     obstacle = self.immovableObstacles.create(width, height - detail.height_offset, 'obstacle', `${obstacleNum}.png`)
    // }

    // if (detail.anim) {
    //     obstacle.play(`obstacle-anim-${obstacleNum}`, 1);
    // }
    // obstacle.setSize(obstacle.width - detail.width, obstacle.height - detail.height)
    // obstacle.setOrigin(0, 1).setImmovable()
    // if (detail.collision_offset > 0) {
    //     obstacle.body.offset.y = +detail.collision_offset
    // }

    // obstacle = this.matter.add.sprite(width, height, 'obstacle', '1', {
    //     shape: this.obstacle_shapes['1'],
    // }).setCollisionGroup(this.immovableObstacles)

    // obstacle = this.matter.add.sprite(width, height, 'obstacle', '1', { shape: this.obstacle_shapes['1'] }, {
    //     label: 'obstacle',
    // }, this.immovableObstacles);
    obstacle = this.matter.add.sprite(width, 500, 'obstacle', obstacleNum);
    obstacle.setBody(this.obstacle_shapes[obstacleNum])
    obstacle.setScale(0.9)
    obstacle.setFixedRotation();
    obstacle.setBounce(0);
    this.immovableObstacles.add(obstacle)
}

function randomNumber(min, max) {
    return Math.floor((Math.random()) * (max - min + 1)) + min
}

function getObstacleDetail(num) {
    if (num == 11) return { ismovable: true, height_offset: 25, anim: true, width: 30, height: 50, collision_offset: 0 }
    if (num == 10) return { ismovable: true, height_offset: 30, anim: true, width: 70, height: 30, collision_offset: 10 }
    if (num == 9) return { ismovable: true, height_offset: 70, anim: true, width: 35, height: 60, collision_offset: 0 }
    if (num == 8) return { ismovable: true, height_offset: 30, anim: true, width: 35, height: 10, collision_offset: 10 }
    if (num == 7) return { ismovable: false, height_offset: 20, anim: true, width: 80, height: 80, collision_offset: 0 }
    if (num == 6) return { ismovable: false, height_offset: 35, anim: false, width: 60, height: 10, collision_offset: 10 }
    if (num < 6) return { ismovable: false, height_offset: 30, anim: false, width: 12, height: 10, collision_offset: 10 }
}

function restartGame() {
    this.matter.world.enabled = true
    this.player.setX(100)
    this.immovableObstacles.clear(true, true)
    this.isGameRunning = true
    this.playerTouchingGround = true

    this.gameoverContainer.setAlpha(0)
    this.anims.resumeAll()
    this.restart.setAlpha(0)

    this.gameSpeed = this.GAME_SPEED
    this.score = 0
    this.nextSpawnTime = this.SPAWN_INTERVAL_MIN
}

function updateGameSetting(gravityY, jumpVelocity) {
    this.matter.world.setGravity(0, gravityY)
    this.JUMP_VELOCITY = jumpVelocity
}