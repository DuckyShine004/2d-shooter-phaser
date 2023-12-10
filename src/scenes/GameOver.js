class GameOverScene extends BaseScene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    super.preload();
  }

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
