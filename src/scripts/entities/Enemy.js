// eslint-disable-next-line no-unused-vars
class Enemy extends Entity {
  constructor(scene, x, y, entityManager, radius, color) {
    super(scene, x, y, radius, color, 0, 3, false, entityManager);

    this.speed = ENEMY_SPEED_DIFFERENCE * Math.random() + ENEMY_LOWER_SPEED_LIMIT;
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
