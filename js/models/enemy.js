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
      config.speed,
      config.deathSprite
    )
  }

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
    // ENEMY ALIVE
    // setup
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
    // setup
    // -------------------------------------------------------------------------------
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

  move() {
    if (this.isDead) {
      return
    }
    this.x += this.vx
  }
  
  die() {
    this.isDead = true
    this.vx = 0
    this.drawCount = 0
    this.deathSprite.colIndex = 0
  }
}