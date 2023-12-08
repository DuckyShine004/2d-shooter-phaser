// eslint-disable-next-line no-unused-vars
class Button extends Phaser.GameObjects.Image {
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
  }
}
