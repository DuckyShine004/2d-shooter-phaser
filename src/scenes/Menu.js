// eslint-disable-next-line no-unused-vars
class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');

    this.buttons = ['play'];
    this.states = ['normal', 'hover', 'click'];

    this.buttonX = window.innerWidth / 2;
    this.buttonY = window.innerHeight / 2;
  }

  preload() {
    for (const button of this.buttons) {
      for (const state of this.states) {
        this.load.image(
          `${button}_${state}`,
          `./src/assets/images/buttons/${button}_${state}.png`,
        );
      }
    }
  }

  create() {
    new Button(
      this,
      this.buttonX,
      this.buttonY,
      'play_normal',
      'play_hover',
      'play_click',
      () => {
        this.scene.start('MainScene');
      },
    );
  }
}
