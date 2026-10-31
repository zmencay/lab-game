// ---------------------
// GAME INIT
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const initBtn = document.getElementById("initBtn")

  const game = new Game('lda-game', initBtn)
  game.start()
})
// ---------------------