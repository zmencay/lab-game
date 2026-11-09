/**
 * Represents the player character.
 * Handles movement, jumping, sprite animations,
 * collision detection, and temporary invulnerability.
 */
class Player {
  /**
   * Creates a player with an initial position and audio manager.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   * @param {number} x - Initial horizontal position.
   * @param {number} y - Initial vertical position.
   * @param {AudioManager} audioManager - Shared game audio manager.
   * @param {string} playerId - Selected playable character identifier.
   */
  constructor(ctx, x, y, audioManager, playerId = 'player1') {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.ground = 0

    this.w = PLAYER_W
    this.h = PLAYER_H

    this.vx = 0
    this.vy = 0
    this.ay = 0

    this.audioManager = audioManager

    this.isJumping = false
    this.isInvulnerable = false

    // -------------------------------------------------------------------------------
    // SPRITE
    // -------------------------------------------------------------------------------
    this.playerConfig = PLAYER_CONFIG[playerId]

    // Right-facing sprite and animation frame dimensions
    this.spriteRight = loadImage(this.playerConfig.right, image => {
      image.frameW = Math.floor(image.width / image.cols)
      image.frameH = Math.floor(image.height / image.rows)
    })

    this.spriteRight.cols = PLAYER_SPRITE_COLS
    this.spriteRight.rows = PLAYER_SPRITE_ROWS
    
    // Initial idle frame
    this.spriteRight.colIndex = 5
    this.spriteRight.rowIndex = 1

    // -------------------------------------------------------------------------------

    // Left-facing sprite and animation frame dimensions
    this.spriteLeft = loadImage(this.playerConfig.left, image => {
      image.frameW = Math.floor(image.width / image.cols)
      image.frameH = Math.floor(image.height / image.rows)
    })
    
    this.spriteLeft.cols = PLAYER_SPRITE_COLS
    this.spriteLeft.rows = PLAYER_SPRITE_ROWS
    
    // Initial idle frame
    this.spriteLeft.colIndex = 5
    this.spriteLeft.rowIndex = 1

    // -------------------------------------------------------------------------------

    // Default facing direction
    this.sprite = this.spriteRight
    
    // -------------------------------------------------------------------------------

    this.drawCount = 0
  }

  /**
   * Enables temporary invulnerability after taking damage.
   * The state is automatically disabled after the configured duration.
   */
  activateInvulnerability() {
    this.isInvulnerable = true

    setTimeout(() => {
      this.isInvulnerable = false
    }, PLAYER_INVULNERABILITY_DURATION)
  }

  /**
   * Positions the player on the specified ground level.
   *
   * @param {number} groundY - Vertical position of the ground.
   */
  groundTo(groundY) {
    this.y = groundY - this.h
    this.ground = groundY
  }

  /**
   * Resets the player's position, movement, and animation state.
   * Preserves the current ground level.
   */
  reset() {
    this.x = 20

    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.isJumping = false

    this.sprite = this.spriteRight
    this.sprite.colIndex = 5
    this.sprite.rowIndex = 1
    this.drawCount = 0

    this.groundTo(this.ground)
  }

  /**
   * Renders the current sprite frame and updates the animation.
   * Applies a blinking effect while the player is invulnerable.
   */
  draw() {
    const blinkTime = Math.floor(Date.now() / PLAYER_BLINK_INTERVAL)
    const isVisible = blinkTime % 2 === 0

    if (this.sprite.isReady && (!this.isInvulnerable || isVisible)) {
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

  /**
   * Updates player position using velocity and gravity.
   * Keeps the player within the canvas boundaries.
   */
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

  /**
   * Handles keyboard input for horizontal movement and jumping.
   *
   * @param {KeyboardEvent} event - Keyboard keydown or keyup event.
   */
  onKeyEvent(event) {
    const isPressed = event.type === 'keydown'

    switch (event.keyCode) {
      case KEY_RIGHT:
        if (isPressed) {
          this.sprite = this.spriteRight
          this.vx = PLAYER_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_LEFT:
        if (isPressed) {
          this.sprite = this.spriteLeft
          this.vx = -PLAYER_VX
        } else {
          this.vx = 0
        }
        break
      case KEY_SPACE:
        if (isPressed && !event.repeat && !this.isJumping) {
          this.audioManager.play('jump')
          this.isJumping = true
          this.vy = -PLAYER_VY
          this.ay = PLAYER_AY
        }
        break;
    }
  }

  /**
   * Selects the appropriate sprite animation
   * based on the player's movement state.
   */
  animate() {
    if (this.isJumping) {
      this.sprite.colIndex = 0
      this.sprite.rowIndex = 0
    } else if (this.vx !== 0) {
      this.animateFrame(5, 1, 6, PLAYER_ANIMATION_FREQ)
    } else {
      this.sprite.colIndex = 5
      this.sprite.rowIndex = 1
    }
  }

  /**
   * Advances the sprite animation at the specified frequency.
   *
   * @param {number} colIndexFrame - Initial column of the animation.
   * @param {number} rowIndexFrame - Row containing the animation.
   * @param {number} spriteFrames - Number of frames in the animation cycle.
   * @param {number} frequency - Number of draw calls between frame updates.
   */
  animateFrame(colIndexFrame, rowIndexFrame, spriteFrames, frequency) {
    if (this.sprite.rowIndex !== rowIndexFrame) { 
      // Reset the frame when switching between animation rows
      this.sprite.colIndex = colIndexFrame
      this.sprite.rowIndex = rowIndexFrame
    } else if (this.drawCount % frequency === 0) {
      this.drawCount = 0
      this.sprite.colIndex = (this.sprite.colIndex + 1) % spriteFrames
    }
  }

  /**
   * Checks whether the player overlaps another rectangular entity.
   *
   * @param {{x: number, y: number, w: number, h: number}} element - Entity to check.
   * @returns {boolean} Whether the bounding rectangles overlap.
   */
  collidesWith(element) {
    return (this.x + this.w > element.x) &&
      (this.x < element.x + element.w) &&
      (this.y + this.h > element.y) &&
      (this.y < element.y + element.h)
  }
}