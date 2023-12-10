// eslint-disable-next-line no-unused-vars
class MenuScene extends BaseScene {
  /**
   * Initialization of the menu scene.
   *
   * @return {void} Nothing is being returned.
   */
  constructor() {
    super('MenuScene');
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
    this.initializeUI(this, 'default', 'main_menu', false, 'PLAY');

    const text = this.add.text(TITLE_X, TITLE_Y, 'Main Menu', {
      fontFamily: 'GameOver',
      fontSize: TITLE_FONT_SIZE,
      fill: '#000000',
    });

    text.setOrigin(0.5, 0.5);
  }
}
