class Player {
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
    this.spriteRight = new Image()
    this.spriteRight.src = PLAYER_SPRITE_RIGHT
    // cols and rows
    this.spriteRight.cols = 5 // how many cols have sprite
    this.spriteRight.rows = 2 // how many rows have sprite
    // sprite init position
    this.spriteRight.colIndex = 0
    this.spriteRight.rowIndex = 1

    this.spriteRight.onload = () => {
      this.spriteRight.isReady = true

      this.spriteRight.frameW = Math.floor(this.spriteRight.width / this.spriteRight.cols)
      this.spriteRight.frameH = Math.floor(this.spriteRight.height / this.spriteRight.rows)
    }

    // sprite setup
    this.spriteLeft = new Image()
    this.spriteLeft.src = PLAYER_SPRITE_LEFT
    // cols and rows
    this.spriteLeft.cols = 5 // how many cols have sprite
    this.spriteLeft.rows = 2 // how many rows have sprite
    // sprite init position
    this.spriteLeft.colIndex = 0
    this.spriteLeft.rowIndex = 1

    this.spriteLeft.onload = () => {
      this.spriteLeft.isReady = true

      this.spriteLeft.frameW = Math.floor(this.spriteLeft.width / this.spriteLeft.cols)
      this.spriteLeft.frameH = Math.floor(this.spriteLeft.height / this.spriteLeft.rows)
    }

    this.sprite = this.spriteRight

    this.drawCount = 0
    
    // audio
    this.jumpAudio = new Audio('./assets/audio/jump.mp3')
    this.jumpAudio.volume = AUDIO_VOL
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
      case KEY_SPACE:
        if (!this.isJumping) {
          this.jumpAudio.play()
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

  collidesWith(element) {
    return (this.x + this.w > element.x) &&
      (this.x < element.x + element.w) &&
      (this.y + this.h > element.y) &&
      (this.y < element.y + element.h)
  }
}