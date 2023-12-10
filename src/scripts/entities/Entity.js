// eslint-disable-next-line no-unused-vars
class Entity extends Phaser.GameObjects.Ellipse {
  /**
   * Initialization of the entity object.
   *
   * @param {Object} scene
   * @param {number} x - The x coordinate of the entity.
   * @param {number} y - The y coordinate of the entity.
   * @param {number} radius - The radius of the entity object.
   * @param {number} color - The color of the entity.
   * @param {number} speed - The speed of the entity.
   * @param {number} stroke - The stroke to be applied.
   * @param {boolean} isCollideBounds - Should the entity collide with bounds.
   * @param {Object} entityManager - The entity manager.
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, radius, color, speed, stroke, isCollideBounds, entityManager) {
    super(scene, x, y, radius, radius, color);

    this.speed = speed;
    this.scene = scene;
    this.radius = radius;

    this.entityManager = entityManager;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(stroke, BLACK);
    this.body.setCollideWorldBounds(isCollideBounds);
  }
}
