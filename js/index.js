// ---------------------
// GAME INIT
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  const initBtn = document.getElementById("initBtn")
  const reloadBtn = document.getElementById("reloadBtn")
  const soundBtn = document.getElementById("soundBtn")
  const nextBtn = document.getElementById("nextBtn")

  const game = new Game('lda-game', initBtn, reloadBtn, soundBtn, nextBtn)
  game.start()
})
// ---------------------