import { BlackjackGame } from "./Blackjack.js"

const game = new BlackjackGame()

function updateGameVisibility() {
  const gameContainer = document.getElementById("gamePlayContainer")
  if (game.isPlaying) {
    gameContainer.style.display = "block"
  } else {
    gameContainer.style.display = "none"
  }
}

function updateYourHandValue() {
  const yourHandValueElement = document.getElementById("yourHandValue")
  yourHandValueElement.textContent = `${game.yourHand.getValue()}`
}

function updateHandTotals() {
  const yourHandValueElement = document.getElementById("yourHandValue")
  yourHandValueElement.textContent = `${game.yourTotal}`

  const dealerHandValueElement = document.getElementById("dealerHandValue")
  dealerHandValueElement.textContent = `${game.dealerTotal}`
}

function updateClearDealerTotal() {
  const dealerHandValueElement = document.getElementById("dealerHandValue")
  dealerHandValueElement.textContent = ""
}

function updateOutcome() {
  const outcomeElement = document.getElementById("outcome")
  outcomeElement.textContent = `${game.message}`
}

function updateClearOutcome() {
  const outcomeElement = document.getElementById("outcome")
  outcomeElement.textContent = ""
}

function updateYourHand() {
  const yourHandElement = document.getElementById("yourHand")
  yourHandElement.innerHTML = ""

  game.yourHand.cards.forEach((card) => {
    const cardElement = document.createElement("div")
    const cardImage = document.createElement("img")
    cardImage.src = `assets/cards/${card}.png`
    cardElement.appendChild(cardImage)
    cardElement.className = "playingCard"
    yourHandElement.appendChild(cardElement)
  })
}

function updateDealerHand() {
  const dealerHandElement = document.getElementById("dealerHand")
  dealerHandElement.innerHTML = ""

  game.dealerHand.cards.forEach((card, index) => {
    const cardElement = document.createElement("div")
    const cardImage = document.createElement("img")

    if (index === 0) {
      cardElement.id = "holeCard"

      if (!game.showHoleCard) {
        cardImage.src = `assets/cards/BACK.png` // Show the back of the card
      } else {
        cardImage.src = `assets/cards/${card}.png` // Reveal the actual card
      }
    } else {
      cardImage.src = `assets/cards/${card}.png`
    }

    cardElement.appendChild(cardImage)
    cardElement.className = "playingCard"
    dealerHandElement.appendChild(cardElement)
  })
}

function updateHideStartButton() {
  const startButtonElement = document.getElementById("startGame")
  startButtonElement.style.display = "none"
}

function updateShowStartButton() {
  const startButtonElement = document.getElementById("startGame")
  startButtonElement.style.display = "block"
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startGame").addEventListener("click", () => {
    game.startGame()
    updateGameVisibility()
    updateDealerHand()
    updateYourHandValue()
    updateYourHand()
    updateClearDealerTotal()
    updateClearOutcome()
    updateHideStartButton()
  })

  document.getElementById("hit").addEventListener("click", () => {
    game.hit()
    updateYourHandValue()
    updateYourHand()
  })

  document.getElementById("stand").addEventListener("click", () => {
    game.stand()
    updateDealerHand()
    updateHandTotals()
    updateOutcome()
    updateShowStartButton()
  })
})
