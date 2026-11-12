/**
 * Main game controller.
 * Coordinates the game loop, player interactions, entity spawning,
 * collisions, level progression, screen rendering, and audio.
 */
class Game {

  /**
   * Initializes the canvas, game state, statistics, timers,
   * audio resources, player, interface assets, event listeners,
   * and first level.
   *
   * @param {string} canvasId - ID of the game canvas element.
   * @param {HTMLElement} initBtn - Button used to start the game.
   * @param {HTMLElement} reloadBtn - Button used to restart the game.
   * @param {HTMLElement} soundBtn - Button used to toggle audio.
   * @param {HTMLElement} nextBtn - Button used to advance to the next level.
   * @param {HTMLElement} player1Btn - Button used to select player 1.
   * @param {HTMLElement} player2Btn - Button used to select player 2.
   */
  constructor(canvasId, initBtn, reloadBtn, soundBtn, nextBtn, player1Btn, player2Btn) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.ctx = this.canvas.getContext('2d')

    this.fps = FPS
    this.level = START_LEVEL
    this.defeatedEnemies = {
      total: 0,
      byLevel: {
        1: 0,
        2: 0,
        3: 0
      }
    }
    // Store elapsed time per level in milliseconds.
    this.levelTimes = {
      1: 0,
      2: 0,
      3: 0
    }
    this.levelStartTime = null

    this.drawIntervalId = null
    this.coinsTimeoutId = null
    this.enemiesTimeoutId = null
    this.isStartedClicked = false
    this.isSelectingPlayer = false

    this.initBtn = initBtn
    this.reloadBtn = reloadBtn    
    this.soundBtn = soundBtn    
    this.nextBtn = nextBtn
    this.player1Btn = player1Btn
    this.player2Btn = player2Btn

    // -------------------------------
    // AUDIO MANAGER
    // -------------------------------
    // Register sound effects and looping background music.
    this.audioManager = new AudioManager()
    this.audioManager.addSound('coin', './assets/audio/coin.mp3', AUDIO_VOL)
    this.audioManager.addSound('damage', './assets/audio/damage.mp3', AUDIO_VOL)
    this.audioManager.addSound('enemy', './assets/audio/enemy.mp3', AUDIO_VOL)
    this.audioManager.addSound('gameOver', './assets/audio/game-over.mp3', AUDIO_VOL)
    this.audioManager.addSound('nextLevel', './assets/audio/next-level.mp3', AUDIO_VOL)
    this.audioManager.addSound('victory', './assets/audio/victory.wav', AUDIO_VOL)
    this.audioManager.addSound('music', './assets/audio/music.mp3', 0.05, true)
    this.audioManager.addSound( 'jump', './assets/audio/jump.mp3', AUDIO_VOL)
    // -------------------------------
    
    // -------------------------------
    // WELCOME WINDOW
    // -------------------------------
    this.initWindow = loadImage('./assets/ui/window/bgn-init.png')
    // -------------------------------
    
    // -------------------------------
    // PLAYER SELECTION
    // -------------------------------
    // Player will be initialized after character selection
    this.player = null

    this.playerSelectionWindow = loadImage('./assets/player/ui/bgn-player-selection.png')
    // -------------------------------

    // -------------------------------
    // HUD
    // -------------------------------
    // Load the HUD background and initialize player health.
    this.hud = loadImage(HUD_IMG)
    // Hearts persist between levels.
    this.hearts = MAX_HEARTS
    this.heart = loadImage(HEARTS_IMG)
    // Load available enemy HUD icons for each level.
    this.enemyHudIcons = {}

    for (const level in ENEMY_CONFIG) {
      const iconPath = ENEMY_CONFIG[level].hudIcon

      this.enemyHudIcons[level] = iconPath ? loadImage(iconPath) : null
    }
    // -------------------------------

    // -------------------------------
    // GAME OVER
    // -------------------------------
    this.gameOverWindow = loadImage(GAMEOVERWINDOW_IMG)
    // -------------------------------

    // -------------------------------
    // NEXT LEVEL
    // -------------------------------
    // Preload transition screens for all non-final levels.
    this.nextLevelImages = []
    for (let level = 1; level < MAX_LEVEL; level++) {
      const image = loadImage(
        `${NEXTLEVEL_PATH}level${level}/next-level${level}.png`
      )

      this.nextLevelImages.push(image)
    }
    // -------------------------------

    // -------------------------------
    // THE END
    // -------------------------------
    this.theEndImg = loadImage(THE_END_IMG)
    // -------------------------------

    // -------------------------------
    // PROJECTILES
    // -------------------------------
    this.projectileSprite = loadImage(PROJECTILE_SPRITE)
    // -------------------------------

    this.setupListeners()

    this.setupLevel()
  }

  /**
   * Starts the game loop if no loop is currently running.
   * Updates and renders the game, checks collisions,
   * records level completion times, and handles level
   * progression or Game Over.
   *
   * Displays the welcome screen until the player starts the game.
   */
  start() {
    if (this.drawIntervalId === null) {
      
      this.audioManager.play('music', false)

      this.drawIntervalId = setInterval(() => {
        if (this.isStartedClicked) {
          this.clear()
          this.move()
          this.draw()
          this.generateElements()
          this.checkCollisions()

          // Level completion takes priority over Game Over
          // when both conditions occur in the same update.
          if (this.checkNextLevel()) {
            this.levelTimes[this.level] = performance.now() - this.levelStartTime
            this.levelStartTime = null

            this.stop()

            if (this.level < MAX_LEVEL) {
              this.nextLevel()
            } else {
              this.gameCompleted()
            }
          } else if (this.checkGameOver()) {
            this.stop()
            this.gameOver()
          }
          
        } else if (this.isSelectingPlayer) {
          this.drawPlayerSelection()
        } else {
          this.drawWelcome()
        }
      }, this.fps)
    }
  }

  /**
   * Renders the scenery, player, collectibles, enemies,
   * projectiles, and HUD elements in their display order.
   */
  draw() {
    // Draw scenery layers from background to foreground.
    this.clouds.draw()
    this.mountains.draw()
    this.aqua.draw()
    this.floor.draw()

    // Draw the player and active game entities.
    this.player.draw()
    this.coins.forEach(coin => coin.draw())
    this.enemies.forEach(enemy => enemy.draw())
    this.projectiles.forEach(projectile => projectile.draw())

    // Draw the HUD above the game scene.
    this.drawHud()
    this.drawPlayerHudIcon()
    this.drawHearts()
    this.drawCollectedCoins()
    this.drawLevelStatus()
    this.drawDefeatedEnemies()
  }

  /**
   * Updates the positions of scenery layers and game entities.
   * Removes collectibles and projectiles outside the canvas.
   */
  move() {
    this.clouds.move()
    this.mountains.move()
    this.aqua.move()
    this.floor.move()
    this.player.move()
    this.coins.forEach(coin => coin.move())
    this.enemies.forEach(enemy => enemy.move())
    this.projectiles.forEach(projectile => projectile.move())

    this.checkBounds()
  }

  /**
   * Clears the entire canvas before rendering the next frame.
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Stops the main game loop and cancels pending
   * collectible and enemy generation timers.
   */
  stop() {
    // Stop the main game loop.
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null

    // Cancel the pending coin spawn.
    clearTimeout(this.coinsTimeoutId)
    this.coinsTimeoutId = null

    // Cancel the pending enemy spawn.
    clearTimeout(this.enemiesTimeoutId)
    this.enemiesTimeoutId = null
  }

  // -----------------------
  // EVENT LISTENERS
  // -----------------------

  /**
   * Registers interface button handlers and keyboard controls.
   * Keyboard input is forwarded to the player according
   * to the current game state.
   */
  setupListeners() {
    
    this.initBtn.addEventListener('click', () => {
      this.isSelectingPlayer = true
      this.initBtn.classList.add("hidden")
      this.player1Btn.classList.remove('hidden')
      this.player2Btn.classList.remove('hidden')
    })

    this.reloadBtn.addEventListener('click', () => {
      window.location.reload()
    })

    this.soundBtn.addEventListener('click', () => {
      this.toggleSound()
      this.soundBtn.classList.toggle('active', !this.audioManager.isMuted)
      this.canvas.focus()
    })

    this.nextBtn.addEventListener('click', () => {
      this.nextBtn.classList.add("hidden")
      
      this.level++
      this.setupLevel()

      // Start timing the new level, excluding transition screens.
      this.levelStartTime = performance.now()
      
      this.start()
      
      this.canvas.focus()
    })

    this.player1Btn.addEventListener('click', () => {
      this.selectPlayer('player1')
    })

    this.player2Btn.addEventListener('click', () => {
      this.selectPlayer('player2')
    })

    // Keydown input is accepted only during active gameplay.
    addEventListener('keydown', (event) => {
      if (this.drawIntervalId !== null && this.isStartedClicked) {
        
        if (event.keyCode === KEY_SHOOT) {
          event.preventDefault()
        }

        this.player.onKeyEvent(event)

        if (event.keyCode === KEY_SHOOT && !event.repeat) {
          const isFacingRight = this.player.sprite === this.player.spriteRight
          const direction = isFacingRight ? 1 : -1

          const x = direction === 1
            ? this.player.x + (this.player.w / 1.5)
            : this.player.x - (PROJECTILE_W / 1.5)

          const y = this.player.y + (this.player.h - PROJECTILE_H) / 1.5

          this.projectiles.push(new Projectile(this.ctx, x, y, direction, this.projectileSprite))
        }
      }
    })

    // Keyup input is accepted only during active gameplay.
    addEventListener('keyup', (event) => {
      if (this.drawIntervalId !== null && this.isStartedClicked) {
        this.player.onKeyEvent(event)
      }
    })
  }
  // -----------------------

  // -----------------------
  // ENTITY GENERATION
  // -----------------------

  /**
   * Schedules collectible and enemy generation.
   * Coins use randomized spawn intervals and vertical positions.
   * Enemies use a fixed interval and the current level configuration.
   *
   * Each timer is scheduled only when no pending timer exists.
   */
  generateElements() {
    if (this.coinsTimeoutId === null) {
      const randomTime = Math.floor(
        Math.random() * (COIN_SPAWN_MAX_TIME - COIN_SPAWN_MIN_TIME + 1)
      ) + COIN_SPAWN_MIN_TIME

      this.coinsTimeoutId = setTimeout(() => {
        const randomY = Math.floor(Math.random() * (COIN_MAX_RANDOM_HEIGHT + 1))
        this.coins.push(
          new Coin(
            this.ctx, this.canvas.width + 100,
            this.canvas.height - BG_FLOOR - COIN_H - randomY),
        )
        this.coinsTimeoutId = null
      }, randomTime)
    }

    if (this.enemiesTimeoutId === null) {
      this.enemiesTimeoutId = setTimeout(() => {
        this.enemies.push(
          Enemy.generateEnemy(
            this.ctx,
            this.canvas.width,
            ENEMY_CONFIG[this.level]
          )
        )
        this.enemiesTimeoutId = null
      }, 4000)
    }
  }
  // -----------------------

  // -----------------------
  // ENTITY BOUNDARIES
  // -----------------------

  /**
   * Removes coins outside the left canvas boundary
   * and projectiles outside either horizontal boundary.
   */
  checkBounds() {
    this.coins = this.coins.filter(coin => coin.x + coin.w >= 0)
    this.projectiles = this.projectiles.filter(projectile =>
      projectile.x + projectile.w >= 0 &&
      projectile.x <= this.canvas.width
    )
  }
  // -----------------------

  // -----------------------
  // COLLISION DETECTION
  // -----------------------

  /**
   * Checks player collisions with coins and enemies,
   * and projectile collisions with active enemies.
   *
   * Collecting a coin increases the score.
   * Landing on an enemy or hitting it with a projectile
   * defeats it and updates the enemy statistics.
   *
   * Projectiles are removed after hitting an enemy.
   * Player damage is limited to one hit per collision check,
   * and temporary invulnerability prevents additional damage.
   */
  checkCollisions() {
    // Remove collected coins and update the score.
    this.coins = this.coins.filter(coin => {
      if (this.player.collidesWith(coin)) {
        this.audioManager.play('coin')
        this.collectedCoins++
        return false
      }
      return true
    })

    // Prevent multiple enemies from dealing damage in one update.
    let hasTakenDamage = false
    this.enemies = this.enemies.filter(enemy => {
      // Defeated enemies remain in the scene but are ignored by collisions.
      if (enemy.isDead) {
        return true
      }

      if (this.player.collidesWith(enemy)) {

        // Compare current and previous foot positions to detect landing.
        const playerFeet = this.player.y + this.player.h
        const previousPlayerFeet = playerFeet - this.player.vy

        const isFalling = this.player.vy > 0
        const landsOnEnemy = previousPlayerFeet <= enemy.y && playerFeet >= enemy.y

        if (isFalling && landsOnEnemy) {
          this.audioManager.play('enemy')
          enemy.die()

          this.defeatedEnemies.total++
          this.defeatedEnemies.byLevel[this.level]++          

          return true
          
        } else if (!hasTakenDamage && !this.player.isInvulnerable) {

          this.audioManager.play('damage')
          this.hearts = Math.max(0, this.hearts - 1)
          hasTakenDamage = true
          this.player.activateInvulnerability()

        }
        return true
      }
      
      return true
    })

    // Check projectile collisions with active enemies.
    this.projectiles = this.projectiles.filter(projectile => {
      const enemyHit = this.enemies.find(enemy =>
        !enemy.isDead &&
        projectile.x < enemy.x + enemy.w &&
        projectile.x + projectile.w > enemy.x &&
        projectile.y < enemy.y + enemy.h &&
        projectile.y + projectile.h > enemy.y
      )

      if (enemyHit) {
        this.audioManager.play('enemy')
        enemyHit.die()

        this.defeatedEnemies.total++
        this.defeatedEnemies.byLevel[this.level]++

        return false
      }

      return true
    })
  }
  // -----------------------

  // -----------------------
  // SCREENS
  // -----------------------

  /**
   * Renders the welcome screen once its image is loaded.
   */
  drawWelcome() {
    if (this.initWindow.isReady) {
      this.ctx.drawImage(this.initWindow, 0, 0, CANVAS_W, CANVAS_H)
    }
  }

  /**
   * Renders the character selection screen once its image is loaded.
   */
  drawPlayerSelection() {
    if (this.playerSelectionWindow.isReady) {
      this.ctx.drawImage(this.playerSelectionWindow, 0, 0, CANVAS_W, CANVAS_H)
    }
  }
  // -----------------------
  
  // -----------------------
  // HUD
  // -----------------------

  /**
   * Renders the HUD background when its image is ready.
   */
  drawHud() {
    if (this.hud.isReady) {
      this.ctx.drawImage(
        this.hud,
        0,
        0,
        HUD_W,
        HUD_H
      )
    }
  }

  /**
   * Renders one heart icon for each remaining player life.
   */
  drawHearts() {
    if (this.heart.isReady) {
      for (let i = 0; i < this.hearts; i++) {
        this.ctx.drawImage(
          this.heart,
          ((HEARTS_W - 4) * i) + 127,
          56,
          HEARTS_W,
          HEARTS_H
        )
      }
    }
  }

  /**
   * Renders the current number of collected coins
   * using the configured HUD text styling.
   */
  drawCollectedCoins() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "black"
    this.ctx.font = "25px impact"
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "right"
    this.ctx.fillText(this.collectedCoins, 360, 82)
    this.ctx.strokeText(this.collectedCoins, 360, 82)
  }

  /**
   * Renders the defeated enemy counter for the current level.
   */
  drawDefeatedEnemies() {
    const count = this.defeatedEnemies.byLevel[this.level]
    const icon = this.enemyHudIcons[this.level]

    if (icon && icon.isReady) {
      // Render the enemy icon.
      this.ctx.drawImage(icon, 635, 53, 50, 35)
    } 
    // Defeated enemies in the current level.
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "black"
    this.ctx.font = "27px impact"
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "right"
    this.ctx.fillText(`${count}`, 740, 82)
    this.ctx.strokeText(`${count}`, 740, 82)

  }

  /**
   * Renders the current level number in the HUD.
   */
  drawLevelStatus() {
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = "black"
    this.ctx.font = "27px impact"
    this.ctx.fillStyle = "#FCAB3A"
    this.ctx.textAlign = "right"
    this.ctx.fillText(this.level, 550, 82)
    this.ctx.strokeText(this.level, 550, 82)
  }

  /**
   * Renders the selected player's portrait in the HUD.
   */
  drawPlayerHudIcon() {
    if (this.playerHudIcon && this.playerHudIcon.isReady) {
      this.ctx.drawImage(this.playerHudIcon, 5, -3, 142, 142)
    }
  }
  // -----------------------

  // -----------------------
  // GAME OVER
  // -----------------------

  /**
   * Checks whether the player has lost all remaining lives.
   *
   * @returns {boolean} True when no hearts remain.
   */
  checkGameOver() {
    return this.hearts <= 0
  }

  /**
   * Renders the Game Over screen when its image is ready.
   */
  drawGameOver() {
    if (this.gameOverWindow.isReady) {
      this.ctx.drawImage(this.gameOverWindow, 0, 0, CANVAS_W, CANVAS_H)
    }
  }

  /**
   * Handles the Game Over state.
   * Resets all recorded level times, plays the corresponding
   * sound, stops background music, renders the final screen,
   * and displays the restart button.
   */
  gameOver() {
    this.levelTimes = {
      1: 0,
      2: 0,
      3: 0
    }
    this.levelStartTime = null

    this.audioManager.play('gameOver')
    this.audioManager.pause('music')
    this.drawGameOver()
    this.reloadBtn.classList.remove("hidden")
  }
  // -----------------------

  // -----------------------
  // LEVEL MANAGEMENT
  // -----------------------

  /**
   * Initializes the current level.
   * Resets entities and collected coins, updates the canvas
   * appearance, creates scenery layers, and resets the player.
   *
   * Remaining hearts are preserved between levels.
   */
  setupLevel() {
    this.coins = []
    this.enemies = []
    this.collectedCoins = 0
    this.projectiles = []

    this.ctx.canvas.className = ''
    this.ctx.canvas.classList.add(`level${this.level}`)

    const levelPath = `./assets/bgn/level${this.level}/`

    // Create parallax scenery layers with independent speed multipliers.
    // A speed multiplier of 0 keeps the floor layer stationary.
    this.clouds = new Scenary(this.ctx, `${levelPath}bgn-clouds.png`, 0, 0, 1280, 427, 0.3)
    this.mountains = new Scenary(this.ctx, `${levelPath}bgn-mountains.png`, 0, 320, 1280, 235, 0.1)
    this.aqua = new Scenary(this.ctx, `${levelPath}bgn-aqua.png`, 0, 290, 1280, 427, 0.1)
    this.floor = new Scenary(this.ctx, `${levelPath}bgn-floor.png`, 0, this.canvas.height - 240, 1280, 240, 0)
    
    if (this.player) this.player.reset()
  }

  /**
   * Checks whether the collectible target for the level has been reached.
   *
   * @returns {boolean} True when enough coins have been collected.
   */
  checkNextLevel() {
    return this.collectedCoins >= COINS_MAX_IN_GAME
  }

  /**
   * Renders the completion screen for the current level.
   * Uses the current level number to select its transition image.
   */
  drawNextLevel() {
    const image = this.nextLevelImages[this.level - 1]

    if (image && image.isReady) {
      this.ctx.drawImage(image,  0,  0,  CANVAS_W,  CANVAS_H)
    }
  }

  /**
   * Handles the level completion state.
   * Plays the transition sound, pauses background music,
   * renders the completion screen, and displays the next-level button.
   */
  nextLevel() {
    this.audioManager.play('nextLevel')
    this.audioManager.pause('music')
    this.drawNextLevel()
    this.nextBtn.classList.remove("hidden")
    this.nextBtn.focus()
  }
  // -----------------------

  // -----------------------
  // GAME COMPLETION
  // -----------------------

  /**
   * Renders the final victory screen when its image is ready.
   */
  drawGameCompleted() {
    if (this.theEndImg.isReady) {
      this.ctx.drawImage(this.theEndImg, 0, 0, CANVAS_W, CANVAS_H)
    }
  }

  /**
   * Renders the final enemy defeat statistics.
   * Displays each enemy icon, its defeat count, and the total.
   */
  drawFinalEnemyStats() {
    const stats = this.defeatedEnemies

    for (let level = 1; level <= MAX_LEVEL; level++) {
      const icon = this.enemyHudIcons[level]
      const count = stats.byLevel[level]

      const x = 265 + (level - 1) * 200

      if (icon && icon.isReady) {
        this.ctx.drawImage(icon, x, 320, 80, 56)
      }

      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = "black"
      this.ctx.font = "38px impact"
      this.ctx.fillStyle = "#2b0353"
      this.ctx.textAlign = "right"
      this.ctx.fillText(`${count}`, x + 147, 363)
      this.ctx.strokeText(`${count}`, x + 147, 363)
    }

    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "white"
    this.ctx.font = "42px impact"
    this.ctx.fillStyle = "#2b0353"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`${stats.total}`, 940, 375)
    this.ctx.strokeText(`${stats.total}`, 940, 375)
  }

  /**
   * Converts milliseconds into MM:SS format.
   *
   * @param {number} milliseconds - Elapsed time in milliseconds.
   * @returns {string} Formatted time.
   */
  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  /**
   * Renders the final level times and total game time.
   */
  drawFinalTimeStats() {
    const totalTime = Object.values(this.levelTimes)
      .reduce((total, time) => total + time, 0)

    for (let level = 1; level <= MAX_LEVEL; level++) {
      const time = this.formatTime(this.levelTimes[level])
      const x =  325 + (level - 1) * 200

      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = "black"
      this.ctx.font = "30px impact"
      this.ctx.fillStyle = "#2b0353"
      this.ctx.textAlign = "left"

      this.ctx.fillText(`${time}`, x, 522)
      this.ctx.strokeText(`${time}`, x, 522)
    }

    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "white"
    this.ctx.font = "42px impact"
    this.ctx.fillStyle = "#2b0353"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`${this.formatTime(totalTime)}`, 940, 532)
    this.ctx.strokeText(`${this.formatTime(totalTime)}`, 940, 532)
  }

  /**
   * Handles successful completion of the final level.
   * Stops background music, plays the victory sound,
   * and renders the final screen and statistics.
   */
  gameCompleted() {
    this.audioManager.pause('music')
    this.audioManager.play('victory')
    this.drawGameCompleted()
    this.drawFinalEnemyStats()
    this.drawFinalTimeStats()
  }
  // -----------------------

  // -----------------------
  // AUDIO CONTROLS
  // -----------------------

  /**
   * Toggles the mute state of all registered audio resources.
   */
  toggleSound() {
    this.audioManager.toggleMute()
  }
  // -----------------------


  // -----------------------
  // PLAYER SELECTION
  // -----------------------
  /**
   * Stores the selected character, initializes the player,
   * and starts the first level timer.
   *
   * @param {string} playerId - Selected character identifier.
   */
  selectPlayer(playerId) {
    this.selectedPlayer = playerId

    // Create the selected character using its configured sprites.
    this.player = new Player(this.ctx, 20, 20, this.audioManager, playerId)
    this.player.groundTo(this.canvas.height - BG_FLOOR)
    this.playerHudIcon = loadImage(PLAYER_CONFIG[playerId].hudIcon)
    
    this.isSelectingPlayer = false
    this.isStartedClicked = true
    this.levelStartTime = performance.now()

    this.player1Btn.classList.add('hidden')
    this.player2Btn.classList.add('hidden')
    
    this.canvas.focus()
  }
  // -----------------------

}