export class Hand {
  constructor(dealer = false) {
    this.dealer = dealer
    this.cards = []
}

  addCard(card) {
    this.cards.push(card)
  }

  getValue() {
    return this.cards.reduce((sum, card) => {
      const data = card.split("-")
      const value = data[0]

      if (isNaN(value)) {
        if (value === "A") {
          return sum + 11 // Add 11 for an Ace
        }
        return sum + 10 // Add 10 for face cards (J, Q, K)
      }

      return sum + parseInt(value) // Add numeric card values
    }, 0) // Start with a sum of 0
  }

  aceCount() {
    return this.cards.filter((card) => card.startsWith("A")).length
  }
}
