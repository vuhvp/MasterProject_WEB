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
    Phaser.Actions.IncX(self.obstacles.getChildren(), increasement * -1)

    self.obstacles.getChildren().forEach(obstacle => {
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
    if (!self.dino.body.onFloor()) {
        self.dino.anims.stop()
        self.dino.setTexture('dino')
    }
    else {
        self.dino.play('dino-run', true)
    }
}

function updateGameSpeed(self, delta) {
    self.gameSpeed += delta * self.GAME_SPPED_SCALE_INCREASE
}

function placeObstacle(self) {
    const { width, height } = self.game.config
    const obstacleNum = Math.floor(Math.random() * 8) + 1

    let obstacle
    if (obstacleNum > 6) {
        obstacle = self.obstacles.create(width, height - 20, `enemy-bird`)
        obstacle.play('dino-fly', 1);
        obstacle.body.height = obstacle.body.height / 1.5;
        obstacle.body.offset.y = +30
    } else {
        obstacle = self.obstacles.create(width, height, `obstacle-${obstacleNum}`)
        obstacle.setBodySize(obstacle.width - obstacle.width / 10, obstacle.height)
        obstacle.body.offset.y = +10
    }
    obstacle.setOrigin(0, 1).setImmovable()
}

function randomNumber(min, max) {
    return Math.floor((Math.random()) * (max - min + 1)) + min
}