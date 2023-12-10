// eslint-disable-next-line no-unused-vars
class GameScene extends BaseScene {
  /**
   * Initialization of the game scene.
   *
   * @return {void} Nothing is being returned.
   */
  constructor() {
    super('GameScene');

    this.elapsedTime = 0;
  }

  /**
   * This is a callback function. When the player dies, switch to game over scene and stop
   * all music.
   *
   * @return {void} Nothing is returned.
   */
  onPlayerDeath() {
    this.scene.start('GameOverScene');
    this.sound.stopAll();
  }

  /**
   * Initializes the player's health bar.
   *
   * @return {void} Nothing is returned.
   */
  initializeHealthBar() {
    this.healthImg = this.add.image(HEALTH_X, HEALTH_Y, 'health');
    this.healthImg.setOrigin(0, 0);
    this.healthImg.setScale(BAR_SCALE_X, BAR_SCALE_Y);

    this.healthBarImg = this.add.image(HEALTH_BAR_X, HEALTH_BAR_Y, 'health_bar');
    this.healthBarImg.setOrigin(0, 0);
    this.healthBarImg.setScale(BAR_SCALE_X, BAR_SCALE_Y);
  }

  /**
   * Initializes score elements.
   *
   * @return {void} Nothing is returned.
   */
  initializeScoreDisplay() {
    this.scoreImg = this.add.image(SCORE_X, SCORE_Y, 'score').setOrigin(0, 0);
    this.scoreImg.setScale(BAR_SCALE_X, BAR_SCALE_Y);

    this.score = this.add.text(SCORE_TEXT_X, SCORE_TEXT_Y, '0', {
      font: '32px "Press Start 2P"',
      align: 'left',
    });

    this.score.setOrigin(1, 0);
  }

  /**
   * Initializes graphical user interface elements.
   *
   * @return {void} Nothing is returned.
   */
  initializeGUI() {
    this.initializeHealthBar();
    this.initializeScoreDisplay();
  }

  /**
   * Preloads any resources. Normally this function is utilized for optimization.
   *
   * @return {void} Nothing is being returned.
   */
  preload() {
    super.preload();
  }

  /**
   * Handle object collisions. Player and enemies, and enemies and bullets.
   *
   * @return {void} Nothing is returned.
   */
  handleCollisions() {
    this.physics.add.overlap(
      this.entityManager.enemies,
      this.entityManager.bullets,
      (enemy, bullet) => enemy.handleBulletCollision(this, enemy, bullet),
    );

    this.physics.add.overlap(this.player, this.entityManager.enemies, (player, enemy) =>
      player.handleEnemyCollision(player, enemy),
    );
  }

  /**
   * Create and render game objects to the scene.
   *
   * @return {void} Nothing is being returned.
   */
  create() {
    this.elapsedTime = 0;

    this.initializeKeyInputs(this);
    this.initializeMusic('game_music');
    this.initializeUI(this, 'none', null, true);
    this.initializeGUI();

    this.entityManager = new EntityManager(this);

    this.player = new Player(
      this,
      CENTRE_X,
      CENTRE_Y,
      PLAYER_SIZE,
      BLUE,
      this.onPlayerDeath.bind(this),
      this.entityManager,
    );
  }

  /**
   * Updates and renders the scene.
   *
   * @param {number} time - The time elapsed.
   * @param {number} delta - The time between each frame.
   * @return {void} Nothing is being returned.
   */
  update(time, delta) {
    this.elapsedTime += delta;

    this.entityManager.update(this.player, this.elapsedTime);
    this.player.update(this.keys, this.cursors, this.mouse);

    this.handleCollisions();
  }
}
