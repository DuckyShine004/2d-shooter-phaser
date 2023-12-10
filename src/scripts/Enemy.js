// eslint-disable-next-line no-unused-vars
class Enemy extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, removeEnemy, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = ENEMY_SPEED_DIFFERENCE * Math.random() + ENEMY_LOWER_SPEED_LIMIT;
    this.radius = radius;

    this.removeEnemy = removeEnemy;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(3, 0x000000);
  }

  update(player) {
    const theta = Utility.getTheta(this.x, player.x, this.y, player.y);

    const dx = this.radius * Math.cos(theta);
    const dy = this.radius * Math.sin(theta);

    const normalization = Utility.getNormalization(dx, dy);

    this.body.setVelocityX(this.speed * dx * normalization);
    this.body.setVelocityY(this.speed * dy * normalization);
  }
}
