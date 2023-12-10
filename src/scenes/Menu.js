// eslint-disable-next-line no-unused-vars
class MenuScene extends BaseScene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    super.preload();
  }

  create() {
    this.initializeUI(this, 'default', 'main_menu');
  }
}
