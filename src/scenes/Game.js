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

  initializeGame() {
    this.initializeInputs();
    this.initializeSounds();
    this.initializeUI();
  }

  initializeInputs() {
    this.input.setDefaultCursor('none');

    this.crosshair = this.add.image(0, 0, 'crosshair');
    this.crosshair.depth = 1000;

    this.input.on('pointermove', (pointer) => {
      this.crosshair.setPosition(pointer.x, pointer.y);
    });

    this.keys = this.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.mouse = this.input.activePointer;
  }

  initializeSounds() {
    this.gameMusic = this.sound.add('game_music', {
      loop: true,
    });

    this.gameMusic.play();
  }

  initializeUI() {
    this.health = this.add.image(HEALTH_X, HEALTH_Y, 'health').setOrigin(0, 0);

    this.healthBar = this.add
      .image(HEALTH_X, HEALTH_Y, 'health_bar')
      .setOrigin(0, 0);

    this.health.setScale(HEALTH_SCALE_X, HEALTH_SCALE_Y);
    this.healthBar.setScale(HEALTH_SCALE_X, HEALTH_SCALE_Y);
  }

  handleBulletEnemyCollision(bullet, enemy) {
    this.sound.play('explosion_sfx');

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
    Utility.getBackground(this);

    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
    this.load.image('crosshair', 'src/assets/images/ui/crosshair.png');
    this.load.image('health', 'src/assets/images/ui/health.png');
    this.load.image('health_bar', 'src/assets/images/ui/health-bar.png');

    this.load.audio('game_music', 'src/assets/sounds/music/game.mp3');
    this.load.audio('shoot_sfx', 'src/assets/sounds/sfx/shoot.wav');
    this.load.audio('explosion_sfx', 'src/assets/sounds/sfx/explosion.wav');
  }

  /**
   * Create and render game objects to the scene.
   *
   * @return {void} Nothing is being returned.
   */
  create() {
    this.initializeGame();

    this.player = new Player(this, 400, 400, 60, 0x77c3ec);
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
