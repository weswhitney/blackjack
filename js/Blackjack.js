import { Deck } from "./Deck.js"
import { Hand } from "./Hand.js"

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

  startGame() {
    this.isPlaying = true
    this.deck.shuffle()

    // Deal hidden card to dealer
    const card = this.deck.deal() // do we need this hole card specific?
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
    // take these out when done developing
    console.log("dealer hand ", this.dealerHand)
    console.log("your hand ", this.yourHand)
    console.log("dealer ", this.dealerHand.getValue())
    console.log("you", this.yourHand.getValue())
  }

  hit() {
    if (!this.canHit) {
      return
    }

    const card = this.deck.deal()
    this.yourHand.addCard(card)
    console.log("you", this.yourHand.getValue())

    // Check if player busts
    if (
      this.handleAce(this.yourHand.getValue(), this.yourHand.aceCount()) > 21
    ) {
      this.canHit = false
    }
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
  }

  handleAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10
      playerAceCount -= 1
    }
    return playerSum
  }
}
