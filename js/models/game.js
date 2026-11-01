// Orquestador de todo lo que pase en mi juego

class Game {
  constructor(canvasId, initBtn) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.ctx = this.canvas.getContext('2d')

    this.fps = FPS
    this.drawIntervalId = null

    this.isStartedClicked = false
    this.initBtn = initBtn;

    this.player = new Player(this.ctx, 20, 20)
    this.player.groundTo(this.canvas.height - BG_FLOOR)
    
    // wellcome window
    this.initWindow = new Scenary(this.ctx, './assets/ui/init/bgn-init.png', 0, 0, 1280, 720, 0)

    // Scenary -> canvas, imgUrl, xPosition, yPosition, imgW, imgH, fps(motion)
    this.clouds = new Scenary(this.ctx, './assets/bgn/levels/bgn-clouds.png', 0, 0, 1280, 427, 0.3)
    this.mountains = new Scenary(this.ctx, './assets/bgn/levels/bgn-mountains.png', 0, 320, 1280, 235, 0.1)
    this.aqua = new Scenary(this.ctx, './assets/bgn/levels/bgn-aqua.png', 0, 290, 1280, 427, 0.1)
    this.floor = new Scenary(this.ctx, './assets/bgn/levels/bgn-floor.png', 0, this.canvas.height - 133, 1280, 133, 0)

    // Collectibles
    this.coins = []
    this.coinsTimeoutId = null
    this.coinAudio = new Audio('./assets/audio/coin.mp3')
    this.coinAudio.volume = AUDIO_VOL

    // Enemies
    this.enemies = []
    this.enemiesTimeoutId = null

    // Score
    this.score = 0

    // HUD
    // hud setup
    this.hud = new Image()
    this.hud.src = HUD_IMG
    this.hud.onload = () => {
      this.hud.isReady = true
    }
    this.collectibles = new Image()
    this.collectibles.src = COLLECTIBLES_IMG
    this.collectibles.onload = () => {
      this.collectibles.isReady = true
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
    this.audio.volume = AUDIO_VOL
    this.audio.loop = true
    
    // ------ GAME OVER
    this.gameOverAudio = new Audio('./assets/audio/game-over.mp3')
    this.gameOverAudio.volume = AUDIO_VOL
  }

  start() {
    if (this.drawIntervalId === null) {
      
      this.setupListeners()
      
      this.audio.play()

      this.drawIntervalId = setInterval(() => {
        if (this.isStartedClicked) {
          this.clear()
          this.move()
          this.draw()
          this.generateElements()
          this.checkCollisions()

          if (this.checkGameOver()) {
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

    // draw score
    this.drawCollectibles()
    this.drawScore()
    // draw HUD
    this.drawHud()
    this.drawHearts()
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
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }

  gameOver() {
    // alert('Perdiste')
    this.gameOverAudio.play()
    this.audio.pause()
  }

  setupListeners() {
    this.initBtn.addEventListener('click', () => {
      this.isStartedClicked = true;
      this.initBtn.classList.add("hidden")
    })
    addEventListener('keydown', (event) => {
      this.player.onKeyEvent(event)
    })
    addEventListener('keyup', (event) => {
      this.player.onKeyEvent(event)
    })
  }


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
      }, 3000);
    }

    if (this.enemiesTimeoutId === null) {
      this.enemiesTimeoutId = setTimeout(() => {
        this.enemies.push(
          Enemy.generateEnemy(
            this.ctx,
            this.canvas.width,
          )
        )
        this.enemiesTimeoutId = null
      }, 4000);
    }
  }

  checkBounds() {
    this.coins = this.coins.filter(coin => coin.x + coin.w >= 0)
  }

  checkCollisions() {
    this.coins = this.coins.filter(coin => {
      if (this.player.collidesWith(coin)) {
        this.coinAudio.play()
        this.score += coin.score
        return false
      }
      return true
    })

    this.enemies = this.enemies.filter(enemy => {
      if (this.player.collidesWith(enemy)) {
        if (this.player.isJumping && this.player.y < enemy.y) {
          this.score += enemy.score
        } else {
          this.hearts--
          this.score -= enemy.score
        }
        return false
      }
      return true
    })
  }
  
  // -----------------------
  // HUD ELEMENTS
  // Health bgn,
  // health hearts,
  // coins score bgn,
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
          HEARTS_W * i + 102,
          38,
          HEARTS_W,
          HEARTS_H
        )
      }
    }
  }
  drawCollectibles() {
    if (this.collectibles.isReady) {
      this.ctx.drawImage(
        this.collectibles,
        190,
        12,
        COLLECTIBLES_W,
        COLLECTIBLES_H
      )
    }
  }
  drawScore() {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
    this.ctx.font = "23px impact";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "right";
    this.ctx.fillText(this.score, 346, 56);
    this.ctx.strokeText(this.score, 346, 56);
  }
  // -----------------------

  checkGameOver() {
    return this.hearts <= 0
  }
}