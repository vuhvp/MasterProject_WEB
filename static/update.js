export default function update(time, delta) {
    var self = this
    if (!this.isGameRunning) return
    const increasement = this.gameSpeed * delta * 0.05
    updateGround(this, increasement)
    updateObstacle(this, delta, increasement)
    updatePlayer(this)
    updateGameSpeed(this, delta)
}

function updateGround(self, increasement) {
    self.ground.tilePositionX += increasement
}

function updateObstacle(self, delta, increasement) {
    Phaser.Actions.IncX(self.movableObstacles.getChildren(), (increasement + 0.5) * -1)
    Phaser.Actions.IncX(self.immovableObstacles.getChildren(), increasement * -1)
    const merged = self.immovableObstacles.getChildren().concat(self.movableObstacles.getChildren());
    merged.forEach(obstacle => {
        if (obstacle.getBounds().right < 0) {
            obstacle.destroy()
        }
    })

    if (self.nextSpawnTime <= 0) {
        placeObstacle(self)
        self.nextSpawnTime = randomNumber(self.SPAWN_INTERVAL_MIN, self.SPAWN_INTERVAL_MAX) / (self.gameSpeed / 10)
    }
    self.nextSpawnTime -= delta
}

function updatePlayer(self) {
    if (!self.playerContainer.body.onFloor()) {
        self.player.anims.stop()
    }
    else {
        self.player.play('running', true)
    }
}

function updateGameSpeed(self, delta) {
    self.gameSpeed += delta * self.GAME_SPPED_SCALE_INCREASE
}

function placeObstacle(self) {
    const { width, height } = self.game.config
    // const obstacleNum = Math.floor(Math.random() * 11) + 1
    const obstacleNum = 9
    let obstacle
    let detail = getObstacleDetail(obstacleNum)

    if (detail.ismovable) {
        obstacle = self.movableObstacles.create(width, height - detail.height_offset, `obstacle-${obstacleNum}`)
    }
    else {
        obstacle = self.immovableObstacles.create(width, height - detail.height_offset, `obstacle-${obstacleNum}`)
    }

    if (detail.anim) {
        obstacle.play(`obstacle-anim-${obstacleNum}`, 1);
    }
    obstacle.setSize(obstacle.width - detail.width, obstacle.height - detail.height)
    obstacle.setOrigin(0, 1).setImmovable()
    if (detail.collision_offset > 0) {
        obstacle.body.offset.y = +detail.collision_offset
    }
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