import { Deck } from "./Deck.js"
import { Hand } from "./Hand.js"

export class BlackjackGame {
  constructor() {
    this.holeCard = null
    this.dealerHand = new Hand(true)
    this.yourHand = new Hand()
    this.deck = new Deck()
    this.canHit = true
  }

  startGame() {
    this.deck.shuffle()

    // Deal hidden card to dealer
    this.holeCard = this.deck.deal()
    this.dealerHand.addCard(this.holeCard)

    // Dealer draws until value is at least 17
    while (this.dealerHand.getValue() < 17) {
      let card = this.deck.deal()
      this.dealerHand.addCard(card)
    }

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
      let card = this.deck.deal()
      this.yourHand.addCard(card)
    }

    console.log("dealer hand ", this.dealerHand)
    console.log("your hand ", this.yourHand)
    console.log("dealer ", this.dealerHand.getValue())
    console.log("you", this.yourHand.getValue())
  }

  hit() {
    if (!this.canHit) {
      return
    }

    let card = this.deck.deal()
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
    const dealerSum = this.handleAce(
      this.dealerHand.getValue(),
      this.dealerHand.aceCount()
    )
    const yourSum = this.handleAce(
      this.yourHand.getValue(),
      this.yourHand.aceCount()
    )

    console.log("dealerSum in stand ", dealerSum)
    console.log("yourSum in stand ", yourSum)

    this.canHit = false

    let message = ""
    if (yourSum > 21) {
      message = "You Lose!"
    } else if (dealerSum > 21) {
      message = "You Win!"
    } else if (yourSum === dealerSum) {
      message = "Push!"
    } else if (yourSum > dealerSum) {
      message = "You Win!"
    } else if (dealerSum > yourSum) {
      message = "You Lose!"
    }
    console.log("game over", message)
  }

  handleAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10
      playerAceCount -= 1
    }
    return playerSum
  }
}
