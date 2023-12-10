// eslint-disable-next-line no-unused-vars
class Player extends Entity {
  /**
   * Initialization of the player object.
   *
   * @param {Object} scene - The game's current scene.
   * @param {number} x - The x coordinate of the player.
   * @param {number} y - The y coordinate of the player.
   * @param {number} radius - The radius of the player object.
   * @param {number} color - The color of the player.
   * @param {Function} onPlayerDeath - A callback function for when the player dies.
   * @param {Object} entityManager - The entity manager.
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, radius, color, onPlayerDeath, entityManager) {
    super(scene, x, y, radius, color, PLAYER_SPEED, 3, true, entityManager);

    this.onPlayerDeath = onPlayerDeath;

    this.health = PLAYER_HEALTH;

    this.isMousePressed = false;

    this.score = 0;
    this.lastEnemySpawnTime = 0;

    this.arm = scene.add.circle(x, y, ARM_SIZE, GREY);
    this.arm.setStrokeStyle(2, BLACK);
  }

  /**
   * Handles the collision between the player and the enemy.
   *
   * @param {Object} player - The player in collision with the enemy.
   * @param {Object} enemy - The enemy in collision with the player.
   * @return {void} Nothing is returned.
   */
  handleEnemyCollision(player, enemy) {
    this.scene.sound.play('hit_sfx');
    this.health--;

    if (!this.health) {
      this.onPlayerDeath();
    }

    this.entityManager.removeEnemy(enemy);

    const ratio = this.health / PLAYER_HEALTH;
    this.scene.healthBarImg.displayWidth = Math.max(ratio * HEALTH_BAR_WIDTH);
  }

  /**
   * Updates the Player.
   *
   * @param {Object} keys - The keyboard input.
   * @param {Object} cursors - The arrow keys.
   * @param {Object} mouse - The mouse input.
   * @param {number} time - The time elapsed.
   * @return {void} Nothing is returned.
   */
  update(keys, cursors, mouse) {
    this.shootBullet(mouse);

    let dx = 0;
    let dy = 0;

    if (keys.left.isDown || cursors.left.isDown) {
      dx = -1;
    } else if (keys.right.isDown || cursors.right.isDown) {
      dx = 1;
    }

    if (keys.up.isDown || cursors.up.isDown) {
      dy = -1;
    } else if (keys.down.isDown || cursors.down.isDown) {
      dy = 1;
    }

    const normalization = Utility.getNormalization(dx, dy);

    this.body.setVelocityX(this.speed * dx * normalization);
    this.body.setVelocityY(this.speed * dy * normalization);

    this.updateArm(mouse);
  }

  /**
   * Update the arm of the player.
   *
   * @param {Object} mouse - The mouse input.
   * @return {void} Nothing is returned.
   */
  updateArm(mouse) {
    const theta = Utility.getTheta(this.x, mouse.worldX, this.y, mouse.worldY);

    const dr = this.radius - this.arm.radius;

    this.arm.x = this.x + dr * Math.cos(theta);
    this.arm.y = this.y + dr * Math.sin(theta);
  }

  /**
   * Handle bullet event. Checks whether a bullet can be shot or not.
   *
   * @param {Object} mouse - The mouse input.
   * @return {void} Nothing is returned.
   */
  shootBullet(mouse) {
    if (mouse.leftButtonDown() && !this.isMousePressed) {
      this.entityManager.addBullet(this.arm.x, this.arm.y, mouse);

      this.isMousePressed = true;
      this.scene.sound.play('shoot_sfx');
    }

    if (mouse.leftButtonReleased() && this.isMousePressed) {
      this.isMousePressed = false;
    }
  }
}
