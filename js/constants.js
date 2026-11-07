// ---------------------
// GAME
// ---------------------
  const FPS = 1000 / 60
  const AUDIO_VOL = 1

  const START_LEVEL = 1
  const MAX_LEVEL = 1
// ---------------------

// ---------------------
// CANVAS
// ---------------------
  // setup
  const CANVAS_W = 1280
  const CANVAS_H = 720

  // bgn variables
  const BG_FLOOR = 52
  const BG_VX = 3
// ---------------------

// ---------------------
// PLAYER
// ---------------------
  // horizontal speed
  const PLAYER_VX = 5

  // vertical speed
  const PLAYER_VY = 10

  // speed
  const PLAYER_AY = 0.4

  // setup
  const PLAYER_W = 138
  const PLAYER_H = 162
  const PLAYER_SPRITE_LEFT = './assets/player/sprite-player-left.png'
  const PLAYER_SPRITE_RIGHT = './assets/player/sprite-player-right.png'
  const PLAYER_BLINK_INTERVAL = 150

// ---------------------

// ---------------------
// GAME CONTROLS
// ---------------------
  const KEY_RIGHT = 39
  const KEY_LEFT = 37
  const KEY_SPACE = 32
// ---------------------

// ---------------------
// COLLECTIBLES
// ---------------------
  // speed
  const COIN_ANIMATION_FREQ = 5
  const COIN_VX = BG_VX
  //  setup
  const COIN_W = 55
  const COIN_H = 60
  const COIN_SPRITE = './assets/ui/sprite-coin.png'
  const COIN_SPRITE_COLS = 11
  const COIN_SPRITE_ROWS = 1
  
  const COINS_MAX_IN_GAME = 10

// ---------------------
// ENEMIES
// ---------------------
  // speed
  const ENEMY_SPRITE_FREQUENCY = 6
  const ENEMY_DIED_SPRITE_FREQUENCY = 10

  // setup
  const ENEMY_W = 218 / 2
  const ENEMY_H = 159 / 2
  const ENEMY_SPRITE_COLS = 6
  const ENEMY_SPRITE_ROWS = 1
  
  const ENEMY_CONFIG = {
    1: {
      speed: 3,
      sprite: './assets/enemies/enemy1.png',
      deathSprite: './assets/enemies/enemy1-death.png'
    },
    2: {
      speed: 4,
      sprite: './assets/enemies/enemy2.png',
      deathSprite: './assets/enemies/enemy2-death.png'
    },
    3: {
      speed: 5,
      sprite: './assets/enemies/enemy3.png',
      deathSprite: './assets/enemies/enemy3-death.png'
    }
  }

// ---------------------
// HUD
// ---------------------
  // hud ui
  const HUD_W = 598
  const HUD_H = 108
  const HUD_IMG = './assets/ui/hud/hud.png'
  // hearts
  const HEARTS_W = 30
  const HEARTS_H = 30
  const HEARTS_IMG = './assets/ui/hud/heart.png'
// ---------------------

// ---------------------
// GAME OVER
// ---------------------
  const GAMEOVERWINDOW_W = 1280
  const GAMEOVERWINDOW_H = 780
  const GAMEOVERWINDOW_IMG = './assets/ui/window/bgn-game-over.png'
// ---------------------

// ---------------------
// NEXT LEVEL
// ---------------------
  const NEXTLEVEL_W = 1280
  const NEXTLEVEL_H = 780
  const NEXTLEVEL_PATH = './assets/bgn/'
// ---------------------