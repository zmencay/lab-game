/**
 * Represents a projectile fired by the player.
 * Handles horizontal movement and sprite rendering.
 */
class Projectile {
  /**
   * Creates a projectile at the specified position.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   * @param {number} direction - Horizontal direction (-1 or 1).
   * @param {HTMLImageElement} sprite - Shared projectile image.
   */
  constructor(ctx, x, y, direction, sprite) {
    this.ctx = ctx

    this.x = x
    this.y = y

    this.w = PROJECTILE_W
    this.h = PROJECTILE_H

    this.vx = PROJECTILE_VX * direction

    this.sprite = sprite
  }

  /**
   * Renders the projectile sprite in its movement direction.
   */
  draw() {
    if (this.sprite.isReady) {
      this.ctx.save()

      if (this.vx < 0) {
        this.ctx.translate(this.x + this.w, this.y)
        this.ctx.scale(-1, 1)
        this.ctx.drawImage(this.sprite, 0, 0, this.w, this.h)
      } else {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h)
      }

      this.ctx.restore()
    }
  }

  /**
   * Updates the projectile's horizontal position.
   */
  move() {
    this.x += this.vx
  }
}