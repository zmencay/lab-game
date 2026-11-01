// ---------------------
// GAME
// ---------------------
  const FPS = 1000 / 60
  const AUDIO_VOL = 1
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

  // HUD
  const PLAYER_HUD = 100
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
  
  const COINS_MAX_IN_GAME = 5
  // coin score
  const COIN_SCORE = 5

// ---------------------
// ENEMIES
// ---------------------
  // speed
  const ENEMY_VX = PLAYER_VX - 3
  const ENEMY_SPRITE_FREQUENCY = 5
  // setup
  const ENEMY_W = 218 / 2
  const ENEMY_H = 159 / 2
  const ENEMY_SPRITE = './assets/enemies/enemy1.png'
  const ENEMY_SPRITE_COLS = 6
  const ENEMY_SPRITE_ROWS = 1
  // enemy score
  const ENEMY_SCORE = 20

// ---------------------
// HUD
// ---------------------
  // hud ui
  const HUD_W = 196
  const HUD_H = 87
  const HUD_IMG = './assets/ui/hud/hud.png'
  // hud ui
  const COLLECTIBLES_W = 200
  const COLLECTIBLES_H = 66
  const COLLECTIBLES_IMG = './assets/ui/hud/collectibles.png'
  // hearts
  const HEARTS_W = 23
  const HEARTS_H = 23
  const HEARTS_IMG = './assets/ui/hud/heart.png'
// ---------------------