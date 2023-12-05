class MainScene extends Phaser.Scene {
  constructor() {
    super('myGameScene');
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 400, 400, 30, 0xff0000);
  }

  update() {
    this.player.update(this.cursors);
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  scene: MainScene
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
