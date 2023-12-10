// eslint-disable-next-line no-unused-vars
class MenuScene extends BaseScene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    super.preload();
  }

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
