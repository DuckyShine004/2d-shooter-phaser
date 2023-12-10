// eslint-disable-next-line no-unused-vars
class MenuScene extends BaseScene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    super.preload();
  }

  create() {
    this.initializeUI(this, 'default', 'main_menu');

    this.add
      .text(WINDOW_WIDTH * 0.5, WINDOW_HEIGHT * 0.2, 'Main Menu', {
        fontFamily: 'GameOver',
        fontSize: '60px',
        fill: '#000000',
      })
      .setOrigin(0.5, 0.5);
  }
}
