// eslint-disable-next-line no-unused-vars
class Enemy extends Entity {
  /**
   * Initialization of the enemy object.
   *
   * @param {Object} scene - The current scene.
   * @param {number} x - The x coordinate of the enemy.
   * @param {number} y - The y coordinate of the enemy.
   * @param {Object} entityManager - The entity manager.
   * @param {number} radius - The radius of the enemy object.
   * @param {number} color - The color of the enemy.
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, entityManager, radius, color) {
    super(scene, x, y, radius, color, 0, 3, false, entityManager);

    this.speed = ENEMY_SPEED_DIFFERENCE * Math.random() + ENEMY_LOWER_SPEED_LIMIT;
  }

  /**
   * Handles the collision between the bullet and the enemy.
   *
   * @param {Object} scene - The current scene.
   * @param {Object} enemy - The enemy in collision with the bullet.
   * @param {Object} bullet - The bullet in collision with the enemy.
   * @return {void} Nothing is returned.
   */
  handleBulletCollision(scene, enemy, bullet) {
    this.scene.sound.play('explosion_sfx');

    this.entityManager.removeEnemy(enemy);
    this.entityManager.removeBullet(bullet);

    scene.player.score += SCORE_INCREMENT;
    scene.score.text = scene.player.score.toString();
  }

  /**
   * Updates the enemy.
   *
   * @param {Object} player - The player.
   * @return {void} Nothing is returned.
   */
  update(player) {
    const theta = Utility.getTheta(this.x, player.x, this.y, player.y);

    const dx = this.radius * Math.cos(theta);
    const dy = this.radius * Math.sin(theta);

    const normalization = Utility.getNormalization(dx, dy);

    this.body.setVelocityX(this.speed * dx * normalization);
    this.body.setVelocityY(this.speed * dy * normalization);
  }
}
