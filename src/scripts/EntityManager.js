class EntityManager {
  constructor(scene) {
    this.scene = scene;

    this.bullets = [];
    this.enemies = [];

    this.lastEnemySpawnTime = 0;
  }

  spawnEnemy(time) {
    this.lastEnemySpawnTime = time;

    let x;
    let y;

    const horizontalEdge = Math.random() < 0.5;

    if (horizontalEdge) {
      x = WINDOW_WIDTH * Math.random();
      y = Math.random() < 0.5 ? 0 : WINDOW_HEIGHT;
    } else {
      x = Math.random() < 0.5 ? 0 : WINDOW_WIDTH;
      y = WINDOW_HEIGHT * Math.random();
    }

    this.addEnemy(new Enemy(this.scene, x, y, this, 60, 0xff1d18));
  }

  addEnemy(enemy) {
    this.enemies.push(enemy);
  }

  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.destroy();
  }

  addBullet(x, y, mouse) {
    this.bullets.push(new Bullet(this.scene, x, y, mouse, this, BULLET_SIZE, YELLOW));
  }

  removeBullet(bullet) {
    this.bullets = this.bullets.filter((b) => b !== bullet);

    bullet.destroy();
    bullet.particles.destroy();
  }

  update(player, time) {
    const spawnRate = Utility.getSpawnRate(time / 1000);

    if (time - this.lastEnemySpawnTime > spawnRate) {
      this.spawnEnemy(time);
    }

    this.bullets.forEach((bullet) => bullet.update());
    this.enemies.forEach((enemy) => enemy.update(player));
  }
}
