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
  constructor(scene, x, y, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = 300;
    this.radius = radius;
    this.mousePressed = false;
    this.lastEnemySpawnTime = 0;

    this.bullets = [];
    this.enemies = [];

    this.shootSfx = scene.sound.add('shoot_sfx');
    this.explosionSfx = scene.sound.add('explosion_sfx');

    this.arm = scene.add.circle(this.x, this.y, 15, 0x202020);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(3, 0x000000);
    this.body.setCollideWorldBounds(true);
  }

  spawnEnemy(time) {
    this.lastEnemySpawnTime = time;
    this.enemies.push(
      new Enemy(this.scene, 0, 0, this.removeEnemy.bind(this), 60, 0x202020),
    );
  }

  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
  }

  /**
   * Removes the bullet for the list of bullets.
   *
   * @param {Object} bullet - The bullet to be removed from the list.
   * @return {void} Nothing is returned.
   */
  removeBullet(bullet) {
    this.bullets = this.bullets.filter((b) => b !== bullet);
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
    this.body.setVelocity(0, 0);

    if (keys.left.isDown || cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    } else if (keys.right.isDown || cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    if (keys.up.isDown || cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (keys.down.isDown || cursors.down.isDown) {
      this.body.setVelocityY(this.speed);
    }

    this.updateArm(mouse);
    this.updateEnemies(time);
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
      this.bullets.push(
        new Bullet(
          this.scene,
          this.arm.x,
          this.arm.y,
          mouse.x,
          mouse.y,
          this.removeBullet.bind(this),
          10,
          0xffea00,
        ),
      );

      this.mousePressed = true;
      this.shootSfx.play();
    }

    if (mouse.leftButtonReleased() && this.mousePressed) {
      this.mousePressed = false;
    }

    for (const bullet of [...this.bullets]) {
      bullet.update();
    }
  }

  updateEnemies(time) {
    if (time - this.lastEnemySpawnTime > 2000) {
      this.spawnEnemy(time);
    }

    for (const enemy of [...this.enemies]) {
      enemy.update(this);
    }
  }
}
