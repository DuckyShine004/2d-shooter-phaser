class Player extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, radius, color) {
    super(scene, x, y, radius, radius, color);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
  }

  update(keys) {
    const speed = 300;

    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    if (keys.left.isDown) {
      this.body.setVelocityX(-speed);
    } else if (keys.right.isDown) {
      this.body.setVelocityX(speed);
    }
    if (keys.up.isDown) {
      this.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      this.body.setVelocityY(speed);
    }
  }
}
