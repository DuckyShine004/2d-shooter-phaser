// eslint-disable-next-line no-unused-vars
class GameScene extends Phaser.Scene {
  /**
   * Initialization of the main scene.
   *
   * @return {void} Nothing is being returned.
   */
  constructor() {
    super('GameScene');
  }

  handleBulletEnemyCollision(bullet, enemy) {
    bullet.removeBullet(bullet);
    enemy.removeEnemy(enemy);

    bullet.destroy();
    enemy.destroy();
    bullet.particles.destroy();
  }

  /**
   * Preloads any resources. Normally this function is utilized for
   * optimization.
   *
   * @return {void} Nothing is being returned.
   */
  preload() {
    Utility.getBackground(this, window);

    this.load.audio('game_music', 'src/assets/sounds/music/game.mp3');

    // this.load.setBaseURL('https://labs.phaser.io');

    // this.load.image('red', 'assets/particles/red.png');
  }

  /**
   * Create and render game objects to the scene.
   *
   * @return {void} Nothing is being returned.
   */
  create() {
    this.gameMusic = this.sound.add('game_music', {
      loop: true,
    });

    this.gameMusic.play();

    this.keys = this.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.mouse = this.input.activePointer;

    this.player = new Player(this, 400, 400, 60, 0x808080);
  }

  /**
   * Updates and renders the scene.
   *@param {number} time - The time elapsed.
   * @return {void} Nothing is being returned.
   */
  update(time) {
    this.player.update(this.keys, this.cursors, this.mouse, time);

    this.physics.add.overlap(
      this.player.bullets,
      this.player.enemies,
      this.handleBulletEnemyCollision,
      null,
      this,
    );
  }
}
