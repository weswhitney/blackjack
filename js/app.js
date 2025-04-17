import { BlackjackGame } from "./Blackjack.js"

const game = new BlackjackGame()

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startGame").addEventListener("click", () => {
    game.startGame()
  })
})

document.getElementById("hit").addEventListener("click", () => {
  game.hit()
})

document.getElementById("stand").addEventListener("click", () => {
  game.stand()
})
