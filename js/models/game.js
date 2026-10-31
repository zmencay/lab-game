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

    this.mario = new Mario(this.ctx, 20, 20)
    this.mario.groundTo(this.canvas.height - BG_FLOOR)

    // Bgnscenary -> xPosition, yPosition, imgW, imgH, fps(motion)
    this.clouds = new Bgnscenary(this.ctx, './assets/bgn/levels/bgn-clouds.png', 0, 0, 1280, 427, 0.3)
    this.mountains = new Bgnscenary(this.ctx, './assets/bgn/levels/bgn-mountains.png', 0, 320, 1280, 235, 0.1)
    this.aqua = new Bgnscenary(this.ctx, './assets/bgn/levels/bgn-aqua.png', 0, 290, 1280, 427, 0.1)
    this.floor = new Bgnscenary(this.ctx, './assets/bgn/levels/bgn-floor.png', 0, this.canvas.height - 133, 1280, 133, 0)
    this.initWindow = new Bgnscenary(this.ctx, './assets/ui/bgn-init.png', 0, 0, 1280, 720, 0)
  }

  start() {
    if (this.drawIntervalId === null) {
      this.setupListeners()
      this.drawIntervalId = setInterval(() => {
        if (this.isStartedClicked) {
          this.clear()
          this.move()
          this.draw()
        } else {
          this.initWindow.draw()
        }
      }, this.fps)
    }
  }

  draw() {
    this.clouds.draw()
    this.mountains.draw()
    this.aqua.draw()
    this.floor.draw()
    this.mario.draw()
  }

  move() {
    this.clouds.move()
    this.mountains.move()
    this.aqua.move()
    this.floor.move()
    this.mario.move()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }

  setupListeners() {
    this.initBtn.addEventListener('click', () => {
      this.isStartedClicked = true;
      this.initBtn.classList.add("hidden")
    })
    addEventListener('keydown', (event) => {
      this.mario.onKeyEvent(event)
    })
    addEventListener('keyup', (event) => {
      this.mario.onKeyEvent(event)
    })
  }
}