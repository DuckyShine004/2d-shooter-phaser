class MainScene extends Phaser.Scene {
  /**
   * Initialization of the main scene.
   *
   * @return {void} Nothing is being returned.
   */
  constructor() {
    super('myGameScene');
  }

  /**
   * Preloads any resources. Normally this function is utilized for
   * optimization.
   *
   * @return {void} Nothing is being returned.
   */
  preload() {
    Utility.getBackground(this, window);

    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('red', 'assets/particles/red.png');
  }

  /**
   * Create and render game objects to the scene.
   *
   * @return {void} Nothing is being returned.
   */
  create() {
    this.keys = this.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.mouse = this.input.activePointer;

    this.player = new Player(this, 400, 400, 60, 0x808080);
  }

  /**
   * Updates and renders the scene.
   *
   * @return {void} Nothing is being returned.
   */
  update() {
    this.player.update(this.keys, this.cursors, this.mouse);
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
      debug: false,
    },
  },
  scene: MainScene,
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
