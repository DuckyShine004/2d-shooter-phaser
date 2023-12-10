class GameOverScene extends BaseScene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    super.preload();
  }

  create() {
    this.initializeMusic('game_over_music');
    this.initializeUI(this, 'default', 'game_over');

    this.add
      .text(TITLE_X, TITLE_Y, 'Game Over', {
        fontFamily: 'GameOver',
        fontSize: TITLE_SIZE,
        fill: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
  }
}
