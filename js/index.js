// ---------------------
// GAME INIT
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const initBtn = document.getElementById("initBtn")
  const reloadBtn = document.getElementById("reloadBtn")

  const game = new Game('lda-game', initBtn, reloadBtn)
  game.start()
})
// ---------------------