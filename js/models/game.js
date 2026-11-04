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

    this.isStartedClicked = false
    this.initBtn = initBtn
    this.reloadBtn = reloadBtn
    this.soundBtn = soundBtn
    this.nextBtn = nextBtn

    this.player = new Player(this.ctx, 20, 20)
    this.player.groundTo(this.canvas.height - BG_FLOOR)
    
    // wellcome window
    this.initWindow = new Scenary(this.ctx, './assets/ui/window/bgn-init.png', 0, 0, 1280, 720, 0)

    // Collectibles
    this.coinsTimeoutId = null
    this.coinAudio = new Audio('./assets/audio/coin.mp3')
    this.coinAudio.volume = AUDIO_VOL

    // Enemies
    this.enemiesTimeoutId = null
    this.enemiesAudio = new Audio('./assets/audio/enemy.mp3')
    this.enemiesAudio.volume = AUDIO_VOL
    this.damageAudio = new Audio('./assets/audio/damage.mp3')
    this.damageAudio.volume = AUDIO_VOL

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

    // Audio
    this.audio = new Audio('./assets/audio/music.mp3')
    this.audio.volume = 0.05
    this.audio.loop = true
    
    // ------ GAME OVER
    this.gameOverAudio = new Audio('./assets/audio/game-over.mp3')
    this.gameOverAudio.volume = AUDIO_VOL
    // gameOver window
    this.gameOverWindow = new Image()
    this.gameOverWindow.src = GAMEOVERWINDOW_IMG
    this.gameOverWindow.onload = () => {
      this.gameOverWindow.isReady = true
    }

    // ------ Next level
    this.nextLevelAudio = new Audio('./assets/audio/next-level.mp3')
    this.nextLevelAudio.volume = AUDIO_VOL
    // nextLevel window
    this.nextLevel1 = new Image()
    this.nextLevel1.src = NEXTLEVEL1_IMG
    this.nextLevel1.onload = () => {
      this.nextLevel1.isReady = true
    }
    // nextLevel window
    this.nextLevel2 = new Image()
    this.nextLevel2.src = NEXTLEVEL2_IMG
    this.nextLevel2.onload = () => {
      this.nextLevel2.isReady = true
    }

    this.setupListeners()

    this.setupLevel()
  }

  start() {
    if (this.drawIntervalId === null) {
      
      // this.audio.play()

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
    // this.soundBtn.addEventListener('click', () => {
    //   this.audio.pause()
    //   this.soundBtn.classList.remove("active")
    // })
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
      this.coinsTimeoutId = setTimeout(() => {
        const randomY = Math.floor(Math.random() * 101)
        this.coins.push(
          new Coin(
            this.ctx, this.canvas.width + 100,
            this.canvas.height - BG_FLOOR - COIN_H - randomY),
        )
        this.coinsTimeoutId = null
      }, 3000)
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
  // coins & enemies
  // zmc: posible iterations
  //      -> pintar el enemigo muerto
  //      -> disparar
  //      -> sonido disparar
  //      -> recoger moneda cuando caigo encima, no cuando colisono con ella
  // -----------------------
  checkCollisions() {
    this.coins = this.coins.filter(coin => {
      if (this.checkNextLevel()) {
        return
      }
      if (this.player.collidesWith(coin)) {
        this.coinAudio.play()
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
        const landsOnEnemy =
          previousPlayerFeet <= enemy.y &&
          playerFeet >= enemy.y

        if (isFalling && landsOnEnemy) {

          this.enemiesAudio.play()
          enemy.die()
          return true

        } else if (!hasTakenDamage) {

          this.damageAudio.play()
          this.hearts = Math.max(0, this.hearts - 1)
          hasTakenDamage = true

        }
        return false
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
    this.gameOverAudio.play()
    this.audio.pause()
    this.drawGameOver()
    this.reloadBtn.classList.remove("hidden")
  }
  // -----------------------

  // -----------------------
  // NEXT LEVEL
  // -----------------------
  // check
  checkNextLevel() {
    return this.collectedCoins >= COINS_MAX_IN_GAME
  }
  // draw next level window
  drawNextLevel() { 
    switch (this.level) {
      case 1:
        if (this.nextLevel1.isReady) {
          this.ctx.drawImage(
            this.nextLevel1,
            0,
            0,
            NEXTLEVEL_W,
            NEXTLEVEL_H
          )
        }
        break;
      case 2:
        if (this.nextLevel2.isReady) {
          this.ctx.drawImage(
            this.nextLevel2,
            0,
            0,
            NEXTLEVEL_W,
            NEXTLEVEL_H
          )
        }
        break;
    }   
  }
  nextLevel() {
    this.nextLevelAudio.play()
    this.audio.pause()
    this.drawNextLevel()
    this.nextBtn.classList.remove("hidden")
  }
  setupLevel() {
    this.coins = []
    this.enemies = []
    this.collectedCoins = 0

    // Scenary -> canvas, imgUrl, xPosition, yPosition, imgW, imgH, fps(motion)
    this.clouds = new Scenary(this.ctx, './assets/bgn/levels/bgn-clouds.png', 0, 0, 1280, 427, 0.3)
    this.mountains = new Scenary(this.ctx, './assets/bgn/levels/bgn-mountains.png', 0, 320, 1280, 235, 0.1)
    this.aqua = new Scenary(this.ctx, './assets/bgn/levels/bgn-aqua.png', 0, 290, 1280, 427, 0.1)
    this.floor = new Scenary(this.ctx, './assets/bgn/levels/bgn-floor.png', 0, this.canvas.height - 133, 1280, 133, 0)
    
    this.player.reset()
  }

  // -----------------------
  // THE END
  // -----------------------
  drawGameCompleted() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 80px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'

    this.ctx.fillText(
      'THE END',
      this.canvas.width / 2,
      this.canvas.height / 2
    )
  }
  gameCompleted() {
    this.audio.pause()
    this.drawGameCompleted()
  }
  // -----------------------
}