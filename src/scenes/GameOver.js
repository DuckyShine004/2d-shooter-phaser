class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  loadFont() {
    const scene = this;

    WebFont.load({
      custom: {
        families: ['GameOver'],
        urls: ['style/font.css'],
      },
      active: function () {
        scene.addFont();
      },
    });
  }

  addFont() {
    this.add.text(100, 100, 'Game Over', {
      fontFamily: 'GameOver',
      fontSize: '32px',
      fill: '#ffffff',
    });
  }

  preload() {
    this.loadFont();
  }

  create() {}
}
