// eslint-disable-next-line no-unused-vars
class GameOverScene extends BaseScene {
  /**
   * Initialization of the game over scene.
   *
   * @return {void} Nothing is being returned.
   */
  constructor() {
    super('GameOverScene');
  }

  /**
   * Preloads any resources. Normally this function is utilized for
   * optimization.
   *
   * @return {void} Nothing is being returned.
   */
  preload() {
    super.preload();
  }

  /**
   * Create and render game objects to the scene.
   *
   * @return {void} Nothing is being returned.
   */
  create() {
    this.initializeMusic('game_over_music');
    this.initializeUI(this, 'default', 'game_over', false, 'RETRY');

    const text = this.add.text(TITLE_X, TITLE_Y, 'Game Over', {
      fontFamily: 'GameOver',
      fontSize: TITLE_FONT_SIZE,
    });

    text.setOrigin(0.5, 0.5);
  }
}
