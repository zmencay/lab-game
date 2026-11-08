/**
 * Represents a scrolling scenery layer.
 * Handles image rendering, horizontal repetition,
 * and parallax movement.
 */
class Scenary {

  /**
   * Creates a scenery layer with its position,
   * dimensions, image asset, and scrolling speed.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {string} src - Path to the scenery image.
   * @param {number} x - Initial horizontal position in pixels.
   * @param {number} y - Initial vertical position in pixels.
   * @param {number} imgW - Rendered image width in pixels.
   * @param {number} imgH - Rendered image height in pixels.
   * @param {number} speed - Parallax speed multiplier; 0 keeps the layer static.
   */
  constructor(ctx, src, x, y, imgW, imgH, speed) {
    this.ctx = ctx

    // Scenery position, dimensions, and parallax speed
    this.x = x
    this.y = y
    this.w = imgW
    this.h = imgH
    this.speed = speed

    this.image = loadImage(src)

    // Base scrolling velocity follows the player's movement speed
    this.vx = -PLAYER_VX
  }

  /**
   * Renders two consecutive copies of the scenery image
   * to create a continuous horizontal background.
   */
  draw() {
    if (this.image.isReady) {
      this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.w,
        this.h
      )

      // Draw a second copy immediately after the first
      this.ctx.drawImage(
        this.image,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      )
    }
  }

  /**
   * Updates the layer's horizontal position according
   * to its parallax speed multiplier.
   * Resets the position after one full image width.
   */
  move() {
    this.x += Math.floor(this.vx * this.speed)

    // Restart the scrolling cycle once the first image leaves the screen
    if (this.x < -this.w) {
      this.x = 0
    }
  }
}