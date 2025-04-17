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

  updateGameVisibility() {
    const gameContainer = document.getElementById("gamePlayContainer")
    if (this.isPlaying) {
      gameContainer.style.display = "block"
    } else {
      gameContainer.style.display = "none"
    }
  }

  updateClearOutcome() {
    const outcomeElement = document.getElementById("outcome")
    outcomeElement.textContent = ""
  }

  updatePlayerHandValue() {
    const playerHandValueElement = document.getElementById("playerHandValue")

    const rawValue = this.playerHand.getValue()
    const aceCount = this.playerHand.aceCount()

    const adjustedValue = this.handleAce(rawValue, aceCount)

    playerHandValueElement.textContent = `${adjustedValue}`
  }

  updateHandTotals() {
    const playerHandValueElement = document.getElementById("playerHandValue")
    playerHandValueElement.textContent = `${this.playerTotal}`

    const dealerHandValueElement = document.getElementById("dealerHandValue")
    dealerHandValueElement.textContent = `${this.dealerTotal}`
  }

  updateClearDealerTotal() {
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

  updateHideStartButton() {
    const startButtonElement = document.getElementById("startGame")
    startButtonElement.style.display = "none"
  }

  updateShowStartButton() {
    const startButtonElement = document.getElementById("startGame")
    startButtonElement.style.display = "block"
  }

  clearGameState = () => {
    this.updateClearDealerTotal()
    this.updateClearOutcome()
  }

  startGame() {
    this.resetState()

    // Deal hidden card to dealer
    const card = this.deck.deal()
    this.dealerHand.addCard(card)

    // Dealer draws until value is at least 17
    while (this.dealerHand.getValue() < 17) {
      const card = this.deck.deal()
      this.dealerHand.addCard(card)
    }

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
      const card = this.deck.deal()
      this.playerHand.addCard(card)
    }
    this.updateGameVisibility()
    this.updateDealerHand()
    this.updatePlayerSection()

    this.clearGameState()
    this.updateHideStartButton()
  }

  updatePlayerSection() {
    this.updatePlayerHandValue()
    this.updatePlayerHand()
  }

  hit() {
    if (!this.canHit) {
      return
    }

    const card = this.deck.deal()
    this.playerHand.addCard(card)

    // Check if player busts
    const currentHandTotal = this.handleAce(
      this.playerHand.getValue(),
      this.playerHand.aceCount()
    )

    if (currentHandTotal > 21) {
      this.canHit = false
      this.stand()
    } else if (currentHandTotal === 21) {
      this.canHit = false
    }
    this.updatePlayerSection()
  }

  stand() {
    this.dealerTotal = this.handleAce(
      this.dealerHand.getValue(),
      this.dealerHand.aceCount()
    )
    this.playerTotal = this.handleAce(
      this.playerHand.getValue(),
      this.playerHand.aceCount()
    )

    this.canHit = false
    this.showHoleCard = true

    if (this.playerTotal > 21) {
      this.message = "Dealer Wins!"
    } else if (this.dealerTotal > 21) {
      this.message = "Player Wins!"
    } else if (this.playerTotal === this.dealerTotal) {
      this.message = "Push!"
    } else if (this.playerTotal > this.dealerTotal) {
      this.message = "Player Wins!"
    } else if (this.dealerTotal > this.playerTotal) {
      this.message = "Dealer Wins!"
    }
    this.updateDealerHand()
    this.updateHandTotals()
    this.updateOutcome()
    this.updateShowStartButton()
  }

  handleAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10
      playerAceCount -= 1
    }
    return playerSum
  }
}
