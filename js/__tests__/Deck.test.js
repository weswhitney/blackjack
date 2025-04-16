import { Deck } from "../Deck"

describe("Deck", () => {
  let deck

  beforeEach(() => {
    deck = new Deck()
  })

  describe("fullDeck", () => {
    test("returns all 52 cards", () => {
      expect(Deck.fullDeck).toHaveLength(52)
      expect(Deck.fullDeck).toContain("A-H")
      expect(Deck.fullDeck).toContain("K-C")
    })
  })

  describe("shuffle", () => {
    test("shuffles the deck", () => {
      const originalDeck = [...deck.cards]
      const shuffledDeck = deck.shuffle()
      expect(shuffledDeck).toHaveLength(52)
      expect(shuffledDeck).toEqual(expect.arrayContaining(originalDeck))
      expect(shuffledDeck).not.toEqual(originalDeck) // Ensure order changes
    })
  })

  describe("deal", () => {
    test("deals the top card from the deck", () => {
      const topCard = deck.cards[deck.cards.length - 1]
      const dealtCard = deck.deal()
      expect(dealtCard).toBe(topCard)
    })

    test("reduces the deck size by one after dealing", () => {
      const initialSize = deck.cards.length
      deck.deal()
      expect(deck.cards).toHaveLength(initialSize - 1)
    })

    test("deals all cards until the deck is empty", () => {
      for (let i = 0; i < 52; i++) {
        deck.deal()
      }
      expect(deck.cards).toHaveLength(0)
    })

    test("returns undefined when dealing from an empty deck", () => {
      for (let i = 0; i < 52; i++) {
        deck.deal()
      }
      expect(deck.deal()).toBeUndefined()
    })
  })
})
