// eslint-disable-next-line no-unused-vars
class Button extends Phaser.GameObjects.Image {
  /**
   * Initialization of the button object.
   *
   * @param {Object} scene - The current scene.
   * @param {number} x - The x coordinate of the button.
   * @param {number} y - The y coordinate of the button.
   * @param {string} normal - The state of the button.
   * @param {string} hover - The state of the button.
   * @param {string} click - The state of the button.
   * @param {Function} callback - the callback function when the button is pressed.
   * @return {void} Nothing is returned.
   */
  constructor(scene, x, y, normal, hover, click, callback) {
    super(scene, x, y, normal);

    this.normal = normal;
    this.hover = hover;
    this.click = click;

    this.setScale(0.75);

    this.setInteractive()
      .on('pointerdown', () => {
        this.setTexture(this.click);
        callback();
      })
      .on('pointerover', () => {
        this.setTexture(this.hover);
      })
      .on('pointerout', () => {
        this.setTexture(this.normal);
      });

    scene.add.existing(this);

    this.setDepth(1);
  }
}
