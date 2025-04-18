export class Deck {
  static get fullDeck() {
    return [
      "A-H",
      "A-D",
      "A-S",
      "A-C",
      "2-H",
      "2-D",
      "2-S",
      "2-C",
      "3-H",
      "3-D",
      "3-S",
      "3-C",
      "4-H",
      "4-D",
      "4-S",
      "4-C",
      "5-H",
      "5-D",
      "5-S",
      "5-C",
      "6-H",
      "6-D",
      "6-S",
      "6-C",
      "7-H",
      "7-D",
      "7-S",
      "7-C",
      "8-H",
      "8-D",
      "8-S",
      "8-C",
      "9-H",
      "9-D",
      "9-S",
      "9-C",
      "10-H",
      "10-D",
      "10-S",
      "10-C",
      "J-H",
      "J-D",
      "J-S",
      "J-C",
      "Q-H",
      "Q-D",
      "Q-S",
      "Q-C",
      "K-H",
      "K-D",
      "K-S",
      "K-C",
    ]
  }
  constructor() {
    this.cards = [...Deck.fullDeck]
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const randomCard = Math.floor(Math.random() * this.cards.length)
      ;[this.cards[i], this.cards[randomCard]] = [
        this.cards[randomCard],
        this.cards[i],
      ]
    }
    return this.cards
  }

  deal() {
    return this.cards.pop()
  }
}
