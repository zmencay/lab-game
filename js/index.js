/**
 * Game entry point.
 * Initializes the game once the DOM is ready.
 */

// ---------------------
// GAME INIT
// ---------------------
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the interface controls required by the game
  const initBtn = document.getElementById("initBtn")
  const reloadBtn = document.getElementById("reloadBtn")
  const soundBtn = document.getElementById("soundBtn")
  const nextBtn = document.getElementById("nextBtn")

  // Create and start the game instance
  const game = new Game('lda-game', initBtn, reloadBtn, soundBtn, nextBtn)
  game.start()
})
// ---------------------