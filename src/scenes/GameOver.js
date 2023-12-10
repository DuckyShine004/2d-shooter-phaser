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
      .text(WINDOW_WIDTH * 0.5, WINDOW_HEIGHT * 0.2, 'Game Over', {
        fontFamily: 'GameOver',
        fontSize: '60px',
        fill: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
  }
}
