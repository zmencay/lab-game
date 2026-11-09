/**
 * Global configuration for game mechanics, entities,
 * visual assets, animations, and interface elements.
 */

// ---------------------
// GAME
// ---------------------

  // Game loop interval in milliseconds and default audio volume
  const FPS = 1000 / 60
  const AUDIO_VOL = 1

  // First and last playable levels
  const START_LEVEL = 1
  const MAX_LEVEL = 3

// ---------------------

// ---------------------
// CANVAS
// ---------------------

  // Canvas dimensions in pixels
  const CANVAS_W = 1280
  const CANVAS_H = 720

  // Ground offset and background scrolling speed
  const BG_FLOOR = 52
  const BG_VX = 3

// ---------------------

// ---------------------
// PLAYER
// ---------------------

  // Horizontal velocity, initial jump velocity, and gravity
  const PLAYER_VX = 5
  const PLAYER_VY = 10
  const PLAYER_AY = 0.4

  // Player dimensions and directional sprite assets
  const PLAYER_W = 138
  const PLAYER_H = 162
  const PLAYER_SPRITE_COLS = 6
  const PLAYER_SPRITE_ROWS = 2

  // Damage feedback and invulnerability durations in milliseconds
  const PLAYER_ANIMATION_FREQ = 4
  const PLAYER_BLINK_INTERVAL = 150
  const PLAYER_INVULNERABILITY_DURATION = 3000

  /**
   * Available playable characters and their sprite assets.
   * Both characters share the same movement and gameplay mechanics.
   *
  * @type {Object.<string, {right: string, left: string}>}
   */
  const PLAYER_CONFIG = {
    player1: {
      right: './assets/player/sprite-player1-right.png',
      left: './assets/player/sprite-player1-left.png'
    },
    player2: {
      right: './assets/player/sprite-player2-right.png',
      left: './assets/player/sprite-player2-left.png'
    }
  }


// ---------------------

// ---------------------
// GAME CONTROLS
// ---------------------

  // Keyboard key codes for movement and jumping
  const KEY_RIGHT = 39
  const KEY_LEFT = 37
  const KEY_SPACE = 32

// ---------------------

// ---------------------
// COLLECTIBLES
// ---------------------

  // Coin animation frequency and horizontal scrolling speed
  const COIN_ANIMATION_FREQ = 5
  const COIN_VX = BG_VX

  // Coin dimensions and spritesheet layout
  const COIN_W = 55
  const COIN_H = 60
  const COIN_SPRITE = './assets/ui/sprite-coin.png'
  const COIN_SPRITE_COLS = 11
  const COIN_SPRITE_ROWS = 1
  
  // Maximum simultaneous coins and vertical spawn range
  const COINS_MAX_IN_GAME = 10
  const COIN_MAX_RANDOM_HEIGHT = 220

  // Minimum and maximum coin spawn intervals in milliseconds
  const COIN_SPAWN_MIN_TIME = 1500
  const COIN_SPAWN_MAX_TIME = 4000

// ---------------------
// ENEMIES
// ---------------------
  
  // Animation frequencies for active and defeated enemies
  const ENEMY_SPRITE_FREQUENCY = 6
  const ENEMY_DIED_SPRITE_FREQUENCY = 10

  /**
   * Defines enemy movement speed and sprite assets for each level.
   *
   * @type {Object<number, {
   *   speed: number,
   *   sprite: string,
   *   deathSprite: string
   * }>}
   */
  const ENEMY_CONFIG = {
    1: {
      speed: 3,
      sprite: './assets/enemies/enemy1.png',
      deathSprite: './assets/enemies/enemy1-death.png'
    },
    2: {
      speed: 6,
      sprite: './assets/enemies/enemy2.png',
      deathSprite: './assets/enemies/enemy2-death.png'
    },
    3: {
      speed: 8,
      sprite: './assets/enemies/enemy3.png',
      deathSprite: './assets/enemies/enemy3-death.png'
    }
  }

  // Enemy dimensions
  const ENEMY_W = 225 / 2
  const ENEMY_H = 160 / 2

  // Active enemy spritesheet layout
  const ENEMY_SPRITE_COLS = 6
  const ENEMY_SPRITE_ROWS = 1
  
  // Defeated enemy spritesheet layout
  const ENEMY_DEATH_SPRITE_COLS = 4
  const ENEMY_DEATH_SPRITE_ROWS = 1

// ---------------------
// HUD
// ---------------------
  
  // HUD dimensions and background asset
  const HUD_W = 598
  const HUD_H = 108
  const HUD_IMG = './assets/ui/hud/hud.png'
  
  // Maximum player health and heart icon configuration
  const MAX_HEARTS = 3
  const HEARTS_W = 30
  const HEARTS_H = 30
  const HEARTS_IMG = './assets/ui/hud/heart.png'

// ---------------------

// ---------------------
// GAME OVER
// ---------------------

  // Game Over screen background asset
  const GAMEOVERWINDOW_IMG = './assets/ui/window/bgn-game-over.png'

// ---------------------

// ---------------------
// NEXT LEVEL
// ---------------------

  // Base directory for level transition backgrounds
  const NEXTLEVEL_PATH = './assets/bgn/'

// ---------------------

// ---------------------
// THE END
// ---------------------

  // Final victory screen background asset
  const THE_END_IMG = './assets/ui/window/bgn-the-end.png'
  
// ---------------------