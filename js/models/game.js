// Orquestador de todo lo que pase en mi juego

class Game {
  constructor(canvasId, initBtn, reloadBtn, soundBtn, nextBtn) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.ctx = this.canvas.getContext('2d')

    this.fps = FPS
    this.drawIntervalId = null

    this.level = START_LEVEL

    this.initBtn = initBtn
    this.isStartedClicked = false

    this.reloadBtn = reloadBtn
    
    this.soundBtn = soundBtn
    
    this.nextBtn = nextBtn

    // audio manager
    this.audioManager = new AudioManager()
    this.audioManager.addSound('coin', './assets/audio/coin.mp3', AUDIO_VOL)
    this.audioManager.addSound('damage', './assets/audio/damage.mp3', AUDIO_VOL)
    this.audioManager.addSound('enemy', './assets/audio/enemy.mp3', AUDIO_VOL)
    this.audioManager.addSound('gameOver', './assets/audio/game-over.mp3', AUDIO_VOL)
    this.audioManager.addSound('nextLevel', './assets/audio/next-level.mp3', AUDIO_VOL)
    this.audioManager.addSound('victory', './assets/audio/victory.wav', AUDIO_VOL)
    this.audioManager.addSound('music', './assets/audio/music.mp3', 0.05, true)
    this.audioManager.addSound( 'jump', './assets/audio/jump.mp3', AUDIO_VOL)

    this.player = new Player(this.ctx, 20, 20, this.audioManager)
    this.player.groundTo(this.canvas.height - BG_FLOOR)
    
    // wellcome window
    this.initWindow = new Scenary(this.ctx, './assets/ui/window/bgn-init.png', 0, 0, 1280, 720, 0)

    // Collectibles
    this.coinsTimeoutId = null

    // Enemies
    this.enemiesTimeoutId = null

    // HUD
    // hud setup
    this.hud = new Image()
    this.hud.src = HUD_IMG
    this.hud.onload = () => {
      this.hud.isReady = true
    }
    // Hud hearts
    this.hearts = 3
    this.heart = new Image()
    this.heart.src = HEARTS_IMG
    this.heart.onload = () => {
      this.heart.isReady = true
    }
    
    // ------ GAME OVER
    // gameOver window
    this.gameOverWindow = new Image()
    this.gameOverWindow.src = GAMEOVERWINDOW_IMG
    this.gameOverWindow.onload = () => {
      this.gameOverWindow.isReady = true
    }

    // ------ Next level
    // next level image loader
    this.nextLevelImages = []
    for (let level = 1; level < MAX_LEVEL; level++) {
      const image = new Image()

      image.src = `${NEXTLEVEL_PATH}level${level}/next-level${level}.png`

      image.onload = () => {
        image.isReady = true
      }

      this.nextLevelImages.push(image)
    }

    // ------ The End
    //  the image
    this.theEndImg = new Image()
    this.theEndImg.onload = () => {
      this.theEndImg.isReady = true
    }
    this.theEndImg.src = THE_END_IMG


    this.setupListeners()

    this.setupLevel()
  }

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

          if (this.checkNextLevel()) {
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
          
        } else {
          this.initWindow.draw()
        }
      }, this.fps)
    }
  }

  draw() {
    // draw scenary bgn
    this.clouds.draw()
    this.mountains.draw()
    this.aqua.draw()
    this.floor.draw()

    // draw player
    this.player.draw()
    // draw each collectibles
    this.coins.forEach(coin => coin.draw())
    // draw each enemies
    this.enemies.forEach(enemy => enemy.draw())

    // draw HUD
    this.drawHud()
    this.drawHearts()
    // draw coins
    this.drawCollectedCoins()
    // draw level 
    this.drawLevelStatus()
  }

  move() {
    this.clouds.move()
    this.mountains.move()
    this.aqua.move()
    this.floor.move()
    this.player.move()
    this.coins.forEach(coin => coin.move())
    this.enemies.forEach(enemy => enemy.move())

    this.checkBounds()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
    // stop principal loop
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null

    // stop coin generator
    clearTimeout(this.coinsTimeoutId)
    this.coinsTimeoutId = null

    // stop enemy generator
    clearTimeout(this.enemiesTimeoutId)
    this.enemiesTimeoutId = null
  }

  // -----------------------
  // LISTENERS
  // buttons &
  // keys
  // -----------------------
  setupListeners() {
    
    this.initBtn.addEventListener('click', () => {
      this.isStartedClicked = true
      this.initBtn.classList.add("hidden")
    })

    this.reloadBtn.addEventListener('click', () => {
      window.location.reload()
    })

    this.soundBtn.addEventListener('click', () => {
      this.toggleSound()
      this.soundBtn.classList.toggle('active', !this.audioManager.isMuted)
    })

    this.nextBtn.addEventListener('click', () => {
      this.nextBtn.classList.add("hidden")
      this.level++
      this.setupLevel()
      this.start()
    })

    addEventListener('keydown', (event) => {
      if (this.drawIntervalId !== null && this.isStartedClicked) {
        this.player.onKeyEvent(event)
      }
    })
    addEventListener('keyup', (event) => {
      this.player.onKeyEvent(event)
    })
  }
  // -----------------------

  // -----------------------
  // ELEMENTS
  // coins &
  // enemies
  // -----------------------
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
  // When we collect a coin, 
  // we filter that coin over 
  // the coin array
  // -----------------------
  checkBounds() {
    this.coins = this.coins.filter(coin => coin.x + coin.w >= 0)
  }
  // -----------------------

  // -----------------------
  // check collisions between
  // coins & enemies with player
  // -----------------------
  checkCollisions() {
    this.coins = this.coins.filter(coin => {
      if (this.player.collidesWith(coin)) {
        this.audioManager.play('coin')
        this.collectedCoins++
        return false
      }
      return true
    })

    let hasTakenDamage = false
    this.enemies = this.enemies.filter(enemy => {
      if (enemy.isDead) {
        return true
      }

      if (this.player.collidesWith(enemy)) {

        const playerFeet = this.player.y + this.player.h
        const previousPlayerFeet = playerFeet - this.player.vy

        const isFalling = this.player.vy > 0
        const landsOnEnemy = previousPlayerFeet <= enemy.y && playerFeet >= enemy.y

        if (isFalling && landsOnEnemy) {
      
          this.audioManager.play('enemy')
          enemy.die()
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
  }
  // -----------------------
  
  // -----------------------
  // HUD ELEMENTS
  // Health, coins and level bgn,
  // health hearts,
  // coins score
  // -----------------------
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
  drawHearts() {
    if (this.heart.isReady) {
      for (let i = 0; i < this.hearts; i++) {
        this.ctx.drawImage(
          this.heart,
          ((HEARTS_W - 2) * i) + 117,
          48,
          HEARTS_W,
          HEARTS_H
        )
      }
    }
  }
  drawCollectedCoins() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = "black"
    this.ctx.font = "25px impact"
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "right"
    this.ctx.fillText(this.collectedCoins, 360, 73)
    this.ctx.strokeText(this.collectedCoins, 360, 73)
  }
  drawLevelStatus() {
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = "black"
    this.ctx.font = "27px impact"
    this.ctx.fillStyle = "#FCAB3A"
    this.ctx.textAlign = "right"
    this.ctx.fillText(this.level, 543, 73)
    this.ctx.strokeText(this.level, 543, 73)
  }
  // -----------------------

  // -----------------------
  // GAME OVER
  // -----------------------
  // check
  checkGameOver() {
    return this.hearts <= 0
  }
  // draw game over window
  drawGameOver() {
    if (this.gameOverWindow.isReady) {
      this.ctx.drawImage(
        this.gameOverWindow,
        0,
        0,
        GAMEOVERWINDOW_W,
        GAMEOVERWINDOW_H
      )
    }
  }
  gameOver() {
    this.audioManager.play('gameOver')
    this.audioManager.pause('music')
    this.drawGameOver()
    this.reloadBtn.classList.remove("hidden")
  }
  // -----------------------

  // -----------------------
  // LEVEL
  // -----------------------
  setupLevel() {
    this.coins = []
    this.enemies = []
    this.collectedCoins = 0

    this.ctx.canvas.className = ''
    this.ctx.canvas.classList.add(`level${this.level}`)

    const levelPath = `./assets/bgn/level${this.level}/`
    // Scenary -> canvas, imgUrl, xPosition, yPosition, imgW, imgH, fps(motion)
    this.clouds = new Scenary(this.ctx, `${levelPath}bgn-clouds.png`, 0, 0, 1280, 427, 0.3)
    this.mountains = new Scenary(this.ctx, `${levelPath}bgn-mountains.png`, 0, 320, 1280, 235, 0.1)
    this.aqua = new Scenary(this.ctx, `${levelPath}bgn-aqua.png`, 0, 290, 1280, 427, 0.1)
    this.floor = new Scenary(this.ctx, `${levelPath}bgn-floor.png`, 0, this.canvas.height - 240, 1280, 240, 0)
    
    this.player.reset()
  }
  // check
  checkNextLevel() {
    return this.collectedCoins >= COINS_MAX_IN_GAME
  }
  // draw next level window
  drawNextLevel() {
    const image = this.nextLevelImages[this.level - 1]

    if (image && image.isReady) {
      this.ctx.drawImage(
        image, 
        0, 
        0, 
        NEXTLEVEL_W, 
        NEXTLEVEL_H
      )
    }
  }
  nextLevel() {
    this.audioManager.play('nextLevel')
    this.audioManager.pause('music')
    this.drawNextLevel()
    this.nextBtn.classList.remove("hidden")
  }

  // -----------------------


  // -----------------------
  // THE END
  // -----------------------
  drawGameCompleted() {
    if (this.theEndImg.isReady) {
      this.ctx.drawImage(
        this.theEndImg, 0, 0, THE_END_W, THE_END_H
      )
    }
  }
  gameCompleted() {
    this.audioManager.pause('music')
    this.audioManager.play('victory')
    this.drawGameCompleted()
  }
  // -----------------------

  // -----------------------
  // SOUND ON/OFF
  // -----------------------
  toggleSound() {
    this.audioManager.toggleMute()
  }
  // -----------------------
}