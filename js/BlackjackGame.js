import { Deck } from "./Deck.js"
import { Hand } from "./Hand.js"

export class BlackjackGame {
  constructor() {
    this.dealerHand = new Hand(true)
    this.playerHand = new Hand()
    this.deck = new Deck()
    this.canHit = true
    this.message = ""
    this.showHoleCard = false
    this.dealerTotal = 0
    this.playerTotal = 0
    this.isPlaying = false
  }

  resetState() {
    this.isPlaying = true
    this.canHit = true
    this.message = ""
    this.showHoleCard = false
    this.dealerTotal = 0
    this.playerTotal = 0
    this.dealerHand = new Hand(true)
    this.playerHand = new Hand()
    this.deck = new Deck()
    this.deck.shuffle()
  }

  setGameVisibility() {
    const gameContainer = document.getElementById("gamePlayContainer")
    if (this.isPlaying) {
      gameContainer.style.display = "block"
    } else {
      gameContainer.style.display = "none"
    }
  }

  clearOutcome() {
    const outcomeElement = document.getElementById("outcome")
    outcomeElement.textContent = ""
  }

  updatePlayerHandValue() {
    const playerHandValueElement = document.getElementById("playerHandValue")

    const rawValue = this.playerHand.value
    const aceCount = this.playerHand.aceCount

    const adjustedValue = this.subtractAceWhenBust(rawValue, aceCount)

    playerHandValueElement.textContent = `${adjustedValue}`
  }

  updateHandTotals() {
    const playerHandValueElement = document.getElementById("playerHandValue")
    playerHandValueElement.textContent = `${this.playerTotal}`

    const dealerHandValueElement = document.getElementById("dealerHandValue")
    dealerHandValueElement.textContent = `${this.dealerTotal}`
  }

  clearDealerTotal() {
    const dealerHandValueElement = document.getElementById("dealerHandValue")
    dealerHandValueElement.textContent = ""
  }

  updateOutcome() {
    const outcomeElement = document.getElementById("outcome")

    outcomeElement.textContent = `${this.message}`

    if (this.message) {
      outcomeElement.style.animationName = "fadeIn"

      outcomeElement.addEventListener(
        "animationend",
        () => {
          outcomeElement.style.animationName = ""
        },
        { once: true }
      )
    }
  }

  updatePlayerHand() {
    const playerHandElement = document.getElementById("playerHand")
    playerHandElement.innerHTML = ""

    this.playerHand.cards.forEach((card) => {
      const cardElement = document.createElement("div")
      const cardImage = document.createElement("img")
      cardImage.src = `assets/cards/${card}.png`
      cardElement.appendChild(cardImage)
      cardElement.className = "playingCard"
      playerHandElement.appendChild(cardElement)
    })
  }

  updateDealerHand() {
    const dealerHandElement = document.getElementById("dealerHand")
    dealerHandElement.innerHTML = ""

    this.dealerHand.cards.forEach((card, index) => {
      const cardElement = document.createElement("div")
      const cardImage = document.createElement("img")

      if (index === 0) {
        cardElement.id = "holeCard"

        if (!this.showHoleCard) {
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

  hideStartButton() {
    const startButtonElement = document.getElementById("startGame")
    startButtonElement.style.display = "none"
  }

  showStartButton() {
    const startButtonElement = document.getElementById("startGame")
    startButtonElement.style.display = "block"
  }

  clearGameState = () => {
    this.clearDealerTotal()
    this.clearOutcome()
  }

  startGame() {
    this.resetState()

    // Deal cards to the dealer
    this.dealerTurn()

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
      this.dealCardToHand(this.playerHand)
    }
    this.setGameVisibility()
    this.updateDealerHand()
    this.updatePlayerSection()

    this.clearGameState()
    this.hideStartButton()
  }

  updatePlayerSection() {
    this.updatePlayerHandValue()
    this.updatePlayerHand()
  }

  hit() {
    if (!this.canHit) return

    this.dealCardToHand(this.playerHand)
    const currentHandTotal = this.calculatePlayerTotal()

    if (this.isBust(currentHandTotal)) {
      this.handleBust()
    } else if (this.isBlackjack(currentHandTotal)) {
      this.canHit = false
    }

    this.updatePlayerSection()
  }

  dealCardToHand(hand) {
    const card = this.deck.deal()
    hand.addCard(card)
  }

  dealerTurn() {
    // Deal the initial hidden card to the dealer
    this.dealCardToHand(this.dealerHand)

    // Dealer draws cards until the total is at least 17
    while (this.dealerHand.value < 17) {
      this.dealCardToHand(this.dealerHand)
    }

    // Use the dealerHand.value directly as the dealerTotal
    this.dealerTotal = this.dealerHand.value
  }

  calculatePlayerTotal() {
    return this.subtractAceWhenBust(
      this.playerHand.value,
      this.playerHand.aceCount
    )
  }

  isBust(total) {
    return total > 21
  }

  isBlackjack(total) {
    return total === 21
  }

  handleBust() {
    this.canHit = false
    this.stand()
  }

  stand() {
    this.calculatePlayerTotal()
    this.canHit = false
    this.showHoleCard = true

    this.determineOutcome()
    this.updateUIAfterStand()
  }

  calculatePlayerTotal() {
    this.playerTotal = this.subtractAceWhenBust(
      this.playerHand.value,
      this.playerHand.aceCount
    )
  }

  determineOutcome() {
    if (this.isBust(this.playerTotal)) {
      this.message = "Dealer Wins!"
    } else if (this.isBust(this.dealerTotal)) {
      this.message = "Player Wins!"
    } else if (this.playerTotal === this.dealerTotal) {
      this.message = "Push!"
    } else if (this.playerTotal > this.dealerTotal) {
      this.message = "Player Wins!"
    } else {
      this.message = "Dealer Wins!"
    }
  }

  updateUIAfterStand() {
    this.updateDealerHand()
    this.updateHandTotals()
    this.updateOutcome()
    this.showStartButton()
  }

  subtractAceWhenBust(handSum, aceCount) {
    while (handSum > 21 && aceCount > 0) {
      handSum -= 10
      aceCount -= 1
    }
    return handSum
  }
}
