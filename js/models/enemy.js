class Enemy {
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
      config.speed
    )
  }

  constructor(ctx, x, y, w, h, src, cols, rows, speed) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.vx = -speed

    this.sprite = new Image()
    this.sprite.src = src
    this.sprite.cols = cols
    this.sprite.rows = rows
    this.sprite.colIndex = 0
    this.sprite.rowIndex = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameW = this.sprite.width / this.sprite.cols
      this.sprite.frameH = this.sprite.height / this.sprite.rows
    }

    this.drawCount = 0
  }

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

  animate() {
    if (this.drawCount >= ENEMY_SPRITE_FREQUENCY) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % this.sprite.cols
    }
  }

  move() {
    this.x += this.vx
  }
}