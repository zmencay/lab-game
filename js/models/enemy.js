/**
 * Represents an enemy in the game.
 * Handles horizontal movement, sprite animations,
 * and the transition to a defeated state.
 */
class Enemy {
  /**
   * Creates an enemy using the configuration of the current level.
   * Positions the enemy on the ground.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {number} x - Initial horizontal position.
   * @param {{speed: number, sprite: string, deathSprite: string}} config - Level-specific enemy configuration.
   * @returns {Enemy} The configured enemy instance.
   */
  static generateEnemy(ctx, x, config) {
    return new Enemy(
      ctx,
      x,
      ctx.canvas.height - BG_FLOOR - ENEMY_H,
      ENEMY_W,
      ENEMY_H,
      config.sprite,
      ENEMY_SPRITE_COLS,
      ENEMY_SPRITE_ROWS,
      config.speed,
      config.deathSprite
    )
  }

  /**
   * Initializes the enemy's position, movement, and sprite assets.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   * @param {number} w - Enemy width.
   * @param {number} h - Enemy height.
   * @param {string} src - Active enemy spritesheet path.
   * @param {number} cols - Number of active sprite columns.
   * @param {number} rows - Number of active sprite rows.
   * @param {number} speed - Horizontal movement speed.
   * @param {string} deathSrc - Defeated enemy spritesheet path.
   */
  constructor(ctx, x, y, w, h, src, cols, rows, speed, deathSrc) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.vx = -speed
    
    // -------------------------------------------------------------------------------
    // SPRITE
    // -------------------------------------------------------------------------------

    // Active enemy spritesheet and frame dimensions
    this.sprite = loadImage(src, image => {
      image.frameW = Math.floor(image.width / image.cols)
      image.frameH = Math.floor(image.height / image.rows)
    })

    this.sprite.cols = cols
    this.sprite.rows = rows

    this.sprite.colIndex = 0
    this.sprite.rowIndex = 0
    
    // -------------------------------------------------------------------------------
    // ENEMY DEATH
    // -------------------------------------------------------------------------------

    // Defeated enemy spritesheet and frame dimensions
    this.deathSprite = loadImage(deathSrc, image => {
      image.frameW = Math.floor(image.width / image.cols)
      image.frameH = Math.floor(image.height / image.rows)
    })

    this.deathSprite.cols = ENEMY_DEATH_SPRITE_COLS
    this.deathSprite.rows = ENEMY_DEATH_SPRITE_ROWS

    this.deathSprite.colIndex = 0
    this.deathSprite.rowIndex = 0

    // -------------------------------------------------------------------------------

    this.drawCount = 0

    this.isDead = false
  }

  /**
   * Renders the current animation frame.
   * Uses the defeated spritesheet when the enemy is dead.
   */
  draw() {
    const currentSprite = this.isDead ? this.deathSprite : this.sprite

    if (currentSprite.isReady) {
      this.ctx.drawImage(
        currentSprite,
        currentSprite.colIndex * currentSprite.frameW,
        currentSprite.rowIndex * currentSprite.frameH,
        currentSprite.frameW,
        currentSprite.frameH,
        this.x,
        this.y,
        this.w,
        this.h
      )

      this.animate()
      this.drawCount++
    }
  }

  /**
   * Updates the active or defeated enemy animation.
   * The defeated animation stops at its final frame.
   */
  animate() {
    if (this.isDead) {
      if (this.drawCount % ENEMY_DIED_SPRITE_FREQUENCY === 0) {
        this.deathSprite.colIndex = Math.min(
          this.deathSprite.colIndex + 1,
          this.deathSprite.cols - 1
        )
      }
      return
    }
    if (this.drawCount >= ENEMY_SPRITE_FREQUENCY) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % this.sprite.cols
    }
  }

  /**
   * Updates horizontal position while the enemy is alive.
   */
  move() {
    if (this.isDead) {
      return
    }
    this.x += this.vx
  }
  
  /**
   * Marks the enemy as defeated, stops movement,
   * and resets the death animation to its first frame.
   */
  die() {
    this.isDead = true
    this.vx = 0
    this.drawCount = 0
    this.deathSprite.colIndex = 0
  }
}