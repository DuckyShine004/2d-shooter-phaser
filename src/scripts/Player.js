// eslint-disable-next-line no-unused-vars
class Player extends Phaser.GameObjects.Ellipse {
  /**
   * Initialization of the player object.
   *
   * @param {Object} scene - The game's current scene.
   * @param {number} x - The x coordinate of the player.
   * @param {number} y - The x coordinate of the player.
   * @param {number} radius - The radius of the player object.
   * @param {number} color - The color of the player.
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, radius, color, onPlayerDeath, entityManager) {
    super(scene, x, y, radius, radius, color);

    this.speed = 300;
    this.radius = radius;
    this.mousePressed = false;
    this.lastEnemySpawnTime = 0;

    this.onPlayerDeath = onPlayerDeath;
    this.entityManager = entityManager;

    this.scene = scene;

    this.arm = scene.add.circle(this.x, this.y, 15, 0x2a2a2a);
    this.arm.setStrokeStyle(2, 0x000000);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(3, 0x000000);
    this.body.setCollideWorldBounds(true);

    this.health = PLAYER_HEALTH;
    this.score = 0;
  }

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
  update(keys, cursors, mouse, time) {
    let vx = 0;
    let vy = 0;

    if (keys.left.isDown || cursors.left.isDown) {
      vx = -1;
    } else if (keys.right.isDown || cursors.right.isDown) {
      vx = 1;
    }

    if (keys.up.isDown || cursors.up.isDown) {
      vy = -1;
    } else if (keys.down.isDown || cursors.down.isDown) {
      vy = 1;
    }

    const normalization = Utility.getNormalization(vx, vy);

    this.body.setVelocityX(this.speed * vx * normalization);
    this.body.setVelocityY(this.speed * vy * normalization);

    this.updateArm(mouse);
    this.updateBullets(mouse);
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
   * Update the bullets in the list of bullets.
   *
   * @param {Object} mouse - The mouse input.
   * @return {void} Nothing is returned.
   */
  updateBullets(mouse) {
    if (mouse.leftButtonDown() && !this.mousePressed) {
      this.entityManager.addBullet(
        new Bullet(
          this.scene,
          this.arm.x,
          this.arm.y,
          mouse,
          this.entityManager,
          10,
          0xffea00,
        ),
      );

      this.mousePressed = true;
      this.scene.sound.play('shoot_sfx');
    }

    if (mouse.leftButtonReleased() && this.mousePressed) {
      this.mousePressed = false;
    }
  }
}
