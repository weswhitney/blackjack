import { BlackjackGame } from "./Blackjack.js"

const game = new BlackjackGame()
window.onload = () => {
  game.startGame()
}

// Attach methods to the window object for global access
window.hit = () => game.hit()
window.stay = () => game.stand()
