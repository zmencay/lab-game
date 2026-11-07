class Scenary {
  constructor(ctx, src, x, y, imgW, imgH, speed) {
    this.ctx = ctx

    // canvas bgn position and size
    this.x = x
    this.y = y
    this.w = imgW
    this.h = imgH
    this.speed = speed

    // Load scenery image
    this.image = loadImage(src)

    // set the player speed
    this.vx = -PLAYER_VX
  }

  draw() {
    if (this.image.isReady) {
      this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.w,
        this.h
      )

      this.ctx.drawImage(
        this.image,
        this.x + this.w,
        this.y,
        this.w,
        this.h
      )
    }
  }

  move() {
    this.x += Math.floor(this.vx * this.speed)

    if (this.x < -this.w) {
      this.x = 0
    }
  }
}