class Coin {
  constructor(
    ctx,
    x,
    y,
    w = COIN_W,
    h = COIN_H,
    src = COIN_SPRITE,
    score = COIN_SCORE
  ) {
    this.ctx = ctx
    this.x = x
    this.y = y

    this.w = w
    this.h = h

    this.score = score

    this.sprite = new Image()
    this.sprite.src = src
    this.sprite.cols = COIN_SPRITE_COLS
    this.sprite.rows = COIN_SPRITE_ROWS
    this.sprite.colIndex = 0
    this.sprite.rowIndex = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true

      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.cols)
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.rows)
    }

    this.vx = -COIN_VX

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

  move() {
    this.x += this.vx
  }

  animate() {
    if (this.drawCount >= COIN_ANIMATION_FREQ) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % this.sprite.cols
    }
  }
}