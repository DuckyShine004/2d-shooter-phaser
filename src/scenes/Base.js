class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);

    this.music = null;
  }

  loadFonts() {
    WebFont.load({
      custom: {
        families: ['GameOver'],
        urls: ['style/font.css'],
      },
    });
  }

  loadImages() {
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
    this.load.image('main_menu', 'src/assets/images/backgrounds/main-menu.png');
    this.load.image('game_over', 'src/assets/images/backgrounds/game-over.png');
    this.load.image('crosshair', 'src/assets/images/ui/crosshair.png');
    this.load.image('health', 'src/assets/images/ui/health.png');
    this.load.image('health_bar', 'src/assets/images/ui/health-bar.png');
    this.load.image('score', 'src/assets/images/ui/score.png');
  }

  loadSounds() {
    this.load.audio('game_music', 'src/assets/sounds/music/game.mp3');
    this.load.audio('game_over_music', 'src/assets/sounds/music/game-over.mp3');
    this.load.audio('shoot_sfx', 'src/assets/sounds/sfx/shoot.wav');
    this.load.audio('hit_sfx', 'src/assets/sounds/sfx/hit.wav');
    this.load.audio('explosion_sfx', 'src/assets/sounds/sfx/explosion.wav');
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
    this.loadFonts();
    this.loadImages();
    this.loadSounds();
    this.loadButtons();
  }

  callback() {
    this.scene.start('GameScene');

    if (this.music) {
      this.music.stop();
    }
  }

  createButton(scene) {
    new Button(
      scene,
      BUTTON_X,
      BUTTON_Y,
      'normal_button',
      'hover_button',
      'click_button',
      this.callback.bind(this),
    );
  }

  initializeMusic() {
    this.music = this.sound.add('game_over_music', {
      loop: true,
    });

    this.music.play();
  }

  initializeUI(scene, cursorKey, backgroundKey = null) {
    this.input.setDefaultCursor(cursorKey);
    this.createButton(scene);

    if (backgroundKey) {
      var backgroundImg = scene.add.image(0, 0, backgroundKey).setOrigin(0, 0);

      backgroundImg.displayWidth = WINDOW_WIDTH;
      backgroundImg.displayHeight = WINDOW_HEIGHT;
    }
  }
}
