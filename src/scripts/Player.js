class Player extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, radius, color) {
    super(scene, x, y, radius, radius, color);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(2, 0xffffff);
    this.body.setCollideWorldBounds(true);

    this.arm = scene.add.circle(this.x, this.y, 50, 0xffffff);
  }

  update(keys, cursors, mouse) {
    const speed = 300;

    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    if (keys.left.isDown || cursors.left.isDown) {
      this.body.setVelocityX(-speed);
    } else if (keys.right.isDown || cursors.right.isDown) {
      this.body.setVelocityX(speed);
    }
    if (keys.up.isDown || cursors.up.isDown) {
      this.body.setVelocityY(-speed);
    } else if (keys.down.isDown || cursors.down.isDown) {
      this.body.setVelocityY(speed);
    }

    this.updateArm(mouse);
  }

  updateArm(mouse) {
    this.arm.x = mouse.worldX;
    this.arm.y = mouse.worldY;
  }
}
