// eslint-disable-next-line no-unused-vars
class BaseScene extends Phaser.Scene {
  /**
   * Initialization of the base scene class.
   *
   * @param {string} key - A scene's key, in the form of a string.
   * @return {void} Nothing is returned.
   */
  constructor(key) {
    super(key);

    this.music = null;
  }

  /**
   * Initializes game inputs.
   *
   * @param {Object} scene - The current scene.
   * @return {void} Nothing is returned.
   */
  initializeKeyInputs(scene) {
    this.keys = this.input.keyboard.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.mouse = this.input.activePointer;
  }

  /**
   * Initializes the background music for the scene.
   *
   * @param {string} musicKey - The music key.
   * @return {void} Nothing is returned.
   */
  initializeMusic(musicKey) {
    this.music = this.sound.add(musicKey, {
      loop: true,
    });

    this.music.play();
  }

  /**
   * Initializes UI elements.
   *
   * @param {Object} scene - The current scene.
   * @param {string} cursorKey - The cursor key.
   * @param {string} backgroundKey - The background key.
   * @param {boolean} isCrosshair - Do we have a custom crosshair ready.
   * @param {string} buttonText - The button's text.
   * @return {void} Nothing is returned.
   */
  initializeUI(scene, cursorKey, backgroundKey = null, isCrosshair = false, buttonText) {
    this.input.setDefaultCursor(cursorKey);

    if (isCrosshair) {
      this.crosshairImg = this.add.image(0, 0, 'crosshair');
      this.crosshairImg.depth = 1000;

      this.input.on('pointermove', (pointer) => {
        this.crosshairImg.setPosition(pointer.x, pointer.y);
      });
    }

    if (backgroundKey) {
      this.createButton(scene, buttonText);

      const backgroundImg = scene.add.image(0, 0, backgroundKey).setOrigin(0, 0);

      backgroundImg.displayWidth = WINDOW_WIDTH;
      backgroundImg.displayHeight = WINDOW_HEIGHT;
    } else {
      Utility.getBackground(scene);
    }
  }

  /**
   * Load all fonts.
   *
   * @return {void} Nothing is returned.
   */
  loadFonts() {
    WebFont.load({
      custom: {
        families: ['GameOver'],
        urls: ['style/font.css'],
      },
    });
  }

  /**
   * Load all images.
   *
   * @return {void} Nothing is returned.
   */
  loadImages() {
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
    this.load.image('main_menu', 'src/assets/images/backgrounds/main-menu.png');
    this.load.image('game_over', 'src/assets/images/backgrounds/game-over.png');
    this.load.image('crosshair', 'src/assets/images/ui/crosshair.png');
    this.load.image('health', 'src/assets/images/ui/health.png');
    this.load.image('health_bar', 'src/assets/images/ui/health-bar.png');
    this.load.image('score', 'src/assets/images/ui/score.png');
  }

  /**
   * Load all sounds.
   *
   * @return {void} Nothing is returned.
   */
  loadSounds() {
    this.load.audio('game_music', 'src/assets/sounds/music/game.mp3');
    this.load.audio('game_over_music', 'src/assets/sounds/music/game-over.mp3');
    this.load.audio('shoot_sfx', 'src/assets/sounds/sfx/shoot.wav');
    this.load.audio('hit_sfx', 'src/assets/sounds/sfx/hit.wav');
    this.load.audio('explosion_sfx', 'src/assets/sounds/sfx/explosion.wav');
  }

  /**
   * Load all buttons.
   *
   * @return {void} Nothing is returned.
   */
  loadButtons() {
    for (const buttonState of BUTTON_STATES) {
      this.load.image(
        `${buttonState}_button`,
        `src/assets/images/buttons/${buttonState}.png`,
      );
    }
  }

  /**
   * A callback function for when the button is pressed. Switches over to the game scene.
   *
   * @return {void} Nothing is returned.
   */
  callback() {
    this.scene.start('GameScene');

    if (this.music) {
      this.music.stop();
    }
  }

  /**
   * Instantiates button object inside of the current scene.
   *
   * @param {*} scene - The current scene.
   * @param {*} buttonText - The button's text.
   * @return {void} Nothing is returned.
   */
  createButton(scene, buttonText) {
    const text = scene.add.text(CENTRE_X, CENTRE_Y, buttonText, {
      fontFamily: 'GameOver',
      fontSize: BUTTON_FONT_SIZE,
      fill: '#000000',
    });

    text.setOrigin(0.5, 0.5);
    text.setDepth(2);

    new Button(
      scene,
      CENTRE_X,
      CENTRE_Y,
      'normal_button',
      'hover_button',
      'click_button',
      this.callback.bind(this),
    );
  }

  /**
   * Preloads any resources. Normally this function is utilized for
   * optimization.
   *
   * @return {void} Nothing is being returned.
   */
  preload() {
    this.loadFonts();
    this.loadImages();
    this.loadSounds();
    this.loadButtons();
  }
}
