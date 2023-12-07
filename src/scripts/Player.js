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

    this.bullets = [];

    this.arm = scene.add.circle(this.x, this.y, 15, 0x202020);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(3, 0x000000);
    this.body.setCollideWorldBounds(true);

    this.enemy = new Enemy(scene, 10, 10, 60, 0xffffff);
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
   * @return {void} Nothing is returned.
   */
  update(keys, cursors, mouse) {
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

    this.enemy.update(this);
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
    }

    if (mouse.leftButtonReleased() && this.mousePressed) {
      this.mousePressed = false;
    }

    for (const bullet of [...this.bullets]) {
      bullet.update();
    }
  }
}
