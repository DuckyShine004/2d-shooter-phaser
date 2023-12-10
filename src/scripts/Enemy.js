// eslint-disable-next-line no-unused-vars
class Enemy extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, entityManager, radius, color) {
    super(scene, x, y, radius, radius, color);

    this.speed = ENEMY_SPEED_DIFFERENCE * Math.random() + ENEMY_LOWER_SPEED_LIMIT;
    this.radius = radius;

    this.entityManager = entityManager;
    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setStrokeStyle(3, 0x000000);
  }

  handleBulletCollision(scene, enemy, bullet) {
    this.scene.sound.play('explosion_sfx');

    this.entityManager.removeEnemy(enemy);
    this.entityManager.removeBullet(bullet);

    scene.player.score += SCORE_INCREMENT;
    scene.score.text = scene.player.score.toString();
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
