// eslint-disable-next-line no-unused-vars
class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');

    this.buttonX = WINDOW_WIDTH / 2;
    this.buttonY = WINDOW_HEIGHT / 2;
  }

  loadImages() {
    this.load.image('main_menu', 'src/assets/images/backgrounds/main-menu.png');
  }

  loadButtons() {
    for (const button_state of BUTTON_STATES) {
      this.load.image(
        `${button_state}_button`,
        `src/assets/images/buttons/${button_state}.png`,
      );
    }
  }

  preload() {
    this.loadImages();
    this.loadButtons();
  }

  create() {
    const backgroundImg = this.add.image(0, 0, 'main_menu').setOrigin(0, 0);

    backgroundImg.displayWidth = WINDOW_WIDTH;
    backgroundImg.displayHeight = WINDOW_HEIGHT;

    new Button(
      this,
      this.buttonX,
      this.buttonY,
      'normal_button',
      'hover_button',
      'click_button',
      () => {
        this.scene.start('GameScene');
      },
    );
  }
}
