class Bullet extends Phaser.GameObjects.Ellipse {
  /**
   * Initialization of the bullet object.
   *
   * @param {Object} scene - The game's current scene.
   * @param {number} x - The x coordinate of the bullet.
   * @param {number} y - The y coordinate of the bullet.
   * @param {number} mouseX - The x coordinate of the mouse.
   * @param {number} mouseY - The y coordinate of the mouse.
   * @param {Function} removeBullet - Callback remove bullet object function.
   * @param {number} radius - The radius of the bullet object.
   * @param {number} color - The color of the bullet.
   */
  constructor(scene, x, y, mouseX, mouseY, removeBullet, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = 20;
    this.radius = radius;
    this.bounds = scene.physics.world.bounds;

    this.theta = Utility.getTheta(this.x, mouseX, this.y, mouseY);

    this.dx = radius * Math.cos(this.theta);
    this.dy = radius * Math.sin(this.theta);

    this.normalization = Utility.getNormalization(this.dx, this.dy);

    this.removeBullet = removeBullet;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  /**
   * Updates the bullet.
   *
   * @return {void} Nothing is returned.
   */
  update() {
    this.body.setVelocityX((this.speed * this.dx) / this.normalization);
    this.body.setVelocityY((this.speed * this.dy) / this.normalization);

    if (
      this.x < this.bounds.left ||
      this.y < this.bounds.top ||
      this.x > this.bounds.right ||
      this.y > this.bounds.bottom
    ) {
      this.removeBullet(this);
      this.destroy();
    }
  }
}
