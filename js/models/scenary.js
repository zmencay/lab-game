class Scenary {
  constructor(ctx, src, x, y, imgW, imgH, fps) {
    this.ctx = ctx

    // canvas bgn position and size
    this.x = x
    this.y = y
    this.w = imgW
    this.h = imgH
    this.fps = fps

    // create the image for canvas
    this.image = new Image()
    this.image.src = src
    this.image.onload = () => {
      this.image.isReady = true
    }

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
    this.x += Math.floor(this.vx * this.fps)

    if (this.x < -this.w) {
      this.x = 0
    }
  }
}