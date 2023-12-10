class Entity extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, radius, color, speed, stroke, isCollideBounds, entityManager) {
    super(scene, x, y, radius, radius, color);

    this.speed = speed;
    this.scene = scene;
    this.radius = radius;

    this.entityManager = entityManager;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(stroke, 0x000000);
    this.body.setCollideWorldBounds(isCollideBounds);
  }
}
