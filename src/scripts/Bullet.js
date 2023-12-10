// eslint-disable-next-line no-unused-vars
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
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, mouse, entityManager, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = 800;
    this.radius = radius;
    this.bounds = scene.physics.world.bounds;

    this.theta = Utility.getTheta(this.x, mouse.x, this.y, mouse.y);

    this.dx = radius * Math.cos(this.theta);
    this.dy = radius * Math.sin(this.theta);

    this.normalization = Utility.getNormalization(this.dx, this.dy);

    this.entityManager = entityManager;

    this.particles = scene.add.particles(0, 0, 'red', {
      speed: 100,
      scale: {start: 0.05, end: 0},
      blendMode: 'ADD',
      follow: this,
    });

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(2, 0x000000);
  }

  isOutOfBounds() {
    return (
      this.x < this.bounds.left ||
      this.y < this.bounds.top ||
      this.x > this.bounds.right ||
      this.y > this.bounds.bottom
    );
  }

  /**
   * Updates the bullet.
   *
   * @return {void} Nothing is returned.
   */
  update() {
    this.body.setVelocityX(this.speed * this.dx * this.normalization);
    this.body.setVelocityY(this.speed * this.dy * this.normalization);

    if (this.isOutOfBounds()) {
      this.entityManager.removeBullet(this);
    }
  }
}
