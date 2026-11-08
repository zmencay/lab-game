/**
 * Represents a collectible coin.
 * Handles horizontal movement and looping sprite animation.
 */
class Coin {
  /**
   * Creates a collectible at the specified position.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   * @param {number} [w=COIN_W] - Coin width.
   * @param {number} [h=COIN_H] - Coin height.
   * @param {string} [src=COIN_SPRITE] - Coin spritesheet path.
   */
  constructor(ctx, x, y, w = COIN_W, h = COIN_H, src = COIN_SPRITE) {
    this.ctx = ctx
    this.x = x
    this.y = y

    this.w = w
    this.h = h

    // -------------------------------------------------------------------------------
    // SPRITE
    // -------------------------------------------------------------------------------

    // Coin spritesheet and frame dimensions
    this.sprite = loadImage(src, image => {
      image.frameW = Math.floor(image.width / image.cols)
      image.frameH = Math.floor(image.height / image.rows)
    })

    this.sprite.cols = COIN_SPRITE_COLS
    this.sprite.rows = COIN_SPRITE_ROWS
    this.sprite.colIndex = 0
    this.sprite.rowIndex = 0

    // -------------------------------------------------------------------------------

    this.vx = -COIN_VX

    this.drawCount = 0
  }

  /**
   * Renders the current coin sprite frame.
   * Updates the animation after drawing.
   */
  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.colIndex * this.sprite.frameW,
        this.sprite.rowIndex * this.sprite.frameH,
        this.sprite.frameW,
        this.sprite.frameH,
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
   * Updates the coin's horizontal position.
   */
  move() {
    this.x += this.vx
  }

  /**
   * Advances the coin animation at the configured frequency.
   * Loops back to the first frame after the last column.
   */
  animate() {
    if (this.drawCount >= COIN_ANIMATION_FREQ) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % this.sprite.cols
    }
  }
}