class Bullet extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, mouseX, mouseY, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = 20;
    this.radius = radius;

    this.theta = Utility.getTheta(this.x, mouseX, this.y, mouseY);

    this.dx = radius * Math.cos(this.theta);
    this.dy = radius * Math.sin(this.theta);

    this.normalization = Utility.getNormalization(this.dx, this.dy);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  update() {
    this.body.setVelocityX(this.speed * this.dx / this.normalization);
    this.body.setVelocityY(this.speed * this.dy / this.normalization);
  }
}
