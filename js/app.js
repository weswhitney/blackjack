import { BlackjackGame } from "./Blackjack.js"

const game = new BlackjackGame()

function updateYourHandValue() {
  const yourHandValueElement = document.getElementById("yourHandValue")
  yourHandValueElement.textContent = `Value: ${game.yourHand.getValue()}`
}

function updateOutcome() {
  const outcomeElement = document.getElementById("outcome")
  outcomeElement.textContent = `${game.message}`
}

function updateYourHand() {
  const yourHandElement = document.getElementById("yourHand")
  yourHandElement.innerHTML = ""

  game.yourHand.cards.forEach((card) => {
    const cardElement = document.createElement("div")
    cardElement.textContent = card
    yourHandElement.appendChild(cardElement)
  })
}

function updateDealerHand() {
  const dealerHandElement = document.getElementById("dealerHand")
  dealerHandElement.innerHTML = ""

  game.dealerHand.cards.forEach((card, index) => {
    const cardElement = document.createElement("div")
    cardElement.textContent = card

    if (index === 0) {
      cardElement.id = "holeCard"
    }

    dealerHandElement.appendChild(cardElement)
  })
}

document.getElementById("startGame").addEventListener("click", () => {
  game.startGame()
  updateDealerHand()
  updateYourHandValue()
  updateYourHand()
})

document.getElementById("hit").addEventListener("click", () => {
  game.hit()
  updateYourHandValue()
  updateYourHand()
})

document.getElementById("stay").addEventListener("click", () => {
  game.stand()
  updateOutcome()
})
