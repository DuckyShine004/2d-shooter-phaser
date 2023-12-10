class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');

    this.buttons = ['play'];
    this.states = ['normal', 'hover', 'click'];

    this.buttonX = WINDOW_WIDTH / 2;
    this.buttonY = WINDOW_HEIGHT / 2;
  }

  preload() {
    WebFont.load({
      custom: {
        families: ['GameOver'],
        urls: ['style/font.css'],
      },
    });

    this.load.image('game_over', 'src/assets/images/backgrounds/game-over.png');

    for (const button of this.buttons) {
      for (const state of this.states) {
        this.load.image(
          `${button}_${state}_button`,
          `src/assets/images/buttons/${button}_${state}.png`,
        );
      }
    }

    this.load.audio('game_over_music', 'src/assets/sounds/music/game-over.mp3');
  }

  create() {
    this.input.setDefaultCursor('default');

    this.gameOverMusic = this.sound.add('game_over_music', {
      loop: true,
    });

    this.gameOverMusic.play();

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

    new Button(
      this,
      this.buttonX,
      this.buttonY,
      'play_normal_button',
      'play_hover_button',
      'play_click_button',
      () => {
        this.scene.start('GameScene');
        this.gameOverMusic.stop();
      },
    );
  }
}
