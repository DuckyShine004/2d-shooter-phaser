// eslint-disable-next-line no-unused-vars
class EntityManager {
  /**
   * Initialization of the entity manager object.
   *
   * @param {Object} scene - The current scene.
   * @return {void} Nothing is being returned.
   */
  constructor(scene) {
    this.scene = scene;

    this.bullets = [];
    this.enemies = [];

    this.lastEnemySpawnTime = 0;
  }

  /**
   * Spawns an enemy after a certain amount of time.
   *
   * @param {number} time - The total time elapsed.
   * @return {void} Nothing is being returned.
   */
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

    this.addEnemy(x, y);
  }

  /**
   * Add an enemy for the given enemy coordinates.
   *
   * @param {number} x - The x coordinate of the enemy.
   * @param {number} y - The y coordinate of the enemy.
   * @return {void} Nothing is being returned.
   */
  addEnemy(x, y) {
    this.enemies.push(new Enemy(this.scene, x, y, this, ENEMY_SIZE, RED));
  }

  /**
   * Removes an enemy from the game.
   *
   * @param {Object} enemy - The enemy object.
   * @return {void} Nothing is being returned.
   */
  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.destroy();
  }

  /**
   * Add a bullet for the given bullet coordinates.
   *
   * @param {number} x - The x coordinate of the bullet.
   * @param {number} y - The y coordinate of the bullet.
   * @param {Object} mouse - the mouse object.
   * @return {void} Nothing is being returned.
   */
  addBullet(x, y, mouse) {
    this.bullets.push(new Bullet(this.scene, x, y, mouse, this, BULLET_SIZE, YELLOW));
  }

  /**
   * Removes a bullet from the game.
   *
   * @param {Object} bullet - The bullet object.
   * @return {void} Nothing is being returned.
   */
  removeBullet(bullet) {
    this.bullets = this.bullets.filter((b) => b !== bullet);

    bullet.destroy();
    bullet.particles.destroy();
  }

  /**
   * Updates the entity manager.
   *
   * @param {Object} player - The player object.
   * @param {number} time - The total time elapsed.
   * @return {void} Nothing is being returned.
   */
  update(player, time) {
    const spawnRate = Utility.getSpawnRate(time / 1000);

    if (time - this.lastEnemySpawnTime > spawnRate) {
      this.spawnEnemy(time);
    }

    this.bullets.forEach((bullet) => bullet.update());
    this.enemies.forEach((enemy) => enemy.update(player));
  }
}
