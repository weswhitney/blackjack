import { Deck } from "./Deck.js"
import { Hand } from "./Hand.js"
// fix name
export class BlackjackGame {
  constructor() {
    this.dealerHand = new Hand(true)
    this.yourHand = new Hand()
    this.deck = new Deck()
    this.canHit = true
    this.message = ""
    this.showHoleCard = false
    this.dealerTotal = 0
    this.yourTotal = 0
    this.isPlaying = false
  }

  resetState() {
    this.isPlaying = true
    this.canHit = true
    this.message = ""
    this.showHoleCard = false
    this.dealerTotal = 0
    this.yourTotal = 0
    this.dealerHand = new Hand(true)
    this.yourHand = new Hand()
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

  updateYourHandValue() {
    const yourHandValueElement = document.getElementById("yourHandValue")

    // Get the raw hand value and Ace count
    const rawValue = this.yourHand.getValue()
    const aceCount = this.yourHand.aceCount()

    // Use handleAce to calculate the adjusted value
    const adjustedValue = this.handleAce(rawValue, aceCount)

    // Display the adjusted value on the UI
    yourHandValueElement.textContent = `${adjustedValue}`
  }

  updateHandTotals() {
    const yourHandValueElement = document.getElementById("yourHandValue")
    yourHandValueElement.textContent = `${this.yourTotal}`

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
  }

  updateYourHand() {
    const yourHandElement = document.getElementById("yourHand")
    yourHandElement.innerHTML = ""

    this.yourHand.cards.forEach((card) => {
      const cardElement = document.createElement("div")
      const cardImage = document.createElement("img")
      cardImage.src = `assets/cards/${card}.png`
      cardElement.appendChild(cardImage)
      cardElement.className = "playingCard"
      yourHandElement.appendChild(cardElement)
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
      this.yourHand.addCard(card)
    }
    this.updateGameVisibility()
    this.updateDealerHand()
    this.updatePlayerHand()

    this.clearGameState()
    this.updateHideStartButton()
  }

  updatePlayerHand() {
    this.updateYourHandValue()
    this.updateYourHand()
  }

  hit() {
    if (!this.canHit) {
      return
    }

    const card = this.deck.deal()
    this.yourHand.addCard(card)

    // Check if player busts
    const currentHandTotal = this.handleAce(
      this.yourHand.getValue(),
      this.yourHand.aceCount()
    )

    if (currentHandTotal > 21) {
      this.canHit = false
      this.stand()
    } else if (currentHandTotal === 21) {
      this.canHit = false
    }
    this.updatePlayerHand()
  }

  stand() {
    this.dealerTotal = this.handleAce(
      this.dealerHand.getValue(),
      this.dealerHand.aceCount()
    )
    this.yourTotal = this.handleAce(
      this.yourHand.getValue(),
      this.yourHand.aceCount()
    )

    this.canHit = false
    this.showHoleCard = true

    if (this.yourTotal > 21) {
      this.message = "Dealer Wins!"
    } else if (this.dealerTotal > 21) {
      this.message = "Player Wins!"
    } else if (this.yourTotal === this.dealerTotal) {
      this.message = "Push!"
    } else if (this.yourTotal > this.dealerTotal) {
      this.message = "Player Wins!"
    } else if (this.dealerTotal > this.yourTotal) {
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
