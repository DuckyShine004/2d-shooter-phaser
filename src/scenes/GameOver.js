class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  preload() {
    WebFont.load({
      custom: {
        families: ['GameOver'],
        urls: ['style/font.css'],
      },
      active: function () {
        scene.addFont();
      },
    });

    this.load.image('game_over', 'src/assets/images/backgrounds/game-over.png');
  }

  create() {
    this.time.delayedCall(
      1000,
      () => {
        this.add
          .text(WINDOW_WIDTH * 0.5, WINDOW_HEIGHT * 0.2, 'Game Over', {
            fontFamily: 'GameOver',
            fontSize: '60px',
            fill: '#ffffff',
          })
          .setOrigin(0.5, 0.5);
      },
      this,
    );

    const backgroundImg = this.add.image(0, 0, 'game_over').setOrigin(0, 0);

    backgroundImg.displayWidth = WINDOW_WIDTH;
    backgroundImg.displayHeight = WINDOW_HEIGHT;
  }
}
