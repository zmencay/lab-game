class Mario {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.ground = 0

    this.w = PLAYER_W
    this.h = PLAYER_H

    this.vx = 0
    this.vy = 0
    this.ay = 0

    this.isJumping = false

    // sprite setup
    this.sprite = new Image()
    this.sprite.src = './assets/player/sprite-player.png'
    // cols and rows
    this.sprite.cols = 5 // how many cols have sprite
    this.sprite.rows = 2 // how many rows have sprite
    // sprite init position
    this.sprite.colIndex = 0
    this.sprite.rowIndex = 1

    this.sprite.onload = () => {
      this.sprite.isReady = true

      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.cols)
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.rows)
    }

    this.drawCount = 0
  }

  groundTo(groundY) {
    this.y = groundY - this.h
    this.ground = groundY
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
    }

    this.animate()
    this.drawCount++
  }

  move() {
    this.vy += this.ay

    this.x += this.vx
    this.y += this.vy

    if (this.y + this.h > this.ground) {
      this.groundTo(this.ground)

      this.vy = 0
      this.ay = 0

      this.isJumping = false
    }

    if (this.x < 0) {
      this.x = 0
    }

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w
    }
  }

  onKeyEvent(event) {
    const isPressed = event.type === 'keydown'

    switch (event.keyCode) {
      case KEY_RIGHT:
        if (isPressed) {
          this.vx = PLAYER_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_LEFT:
        if (isPressed) {
          this.vx = -PLAYER_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_UP:
        if (!this.isJumping) {
          this.isJumping = true
          this.vy = -PLAYER_VY
          this.ay = PLAYER_AY
        }
        break;
    }
  }

  animate() {
    if (this.isJumping) {
      this.sprite.colIndex = 0
      this.sprite.rowIndex = 0
    } else if (this.vx !== 0) {
      this.animateFrame(0, 1, 5, 6)
    } else {
      this.sprite.colIndex = 0
      this.sprite.rowIndex = 1
    }
  }

  animateFrame(colIndexFrame, rowIndexFrame, spriteFrames, frequency) {
    if (this.sprite.rowIndex !== rowIndexFrame) { 
      // Comprueba si vengo de otra animacion, por ejemplo de jumping que la rowIndex seria 0
      this.sprite.colIndex = colIndexFrame
      this.sprite.rowIndex = rowIndexFrame
    } else if (this.drawCount % frequency === 0) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % spriteFrames
    }
  }
}