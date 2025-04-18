import { Hand } from "../Hand"

describe("Hand", () => {
  let hand

  beforeEach(() => {
    hand = new Hand()
  })

  describe("addCard", () => {
    test("adds a card to the hand", () => {
      hand.addCard("10-H")
      expect(hand.cards).toContain("10-H")
    })

    test("adds multiple cards to the hand", () => {
      hand.addCard("10-H")
      hand.addCard("J-S")
      expect(hand.cards).toEqual(["10-H", "J-S"])
    })
  })

  describe("value", () => {
    test("calculates value for numeric cards", () => {
      hand.addCard("2-H")
      hand.addCard("5-D")
      expect(hand.value).toBe(7)
    })

    test("calculates value for face cards", () => {
      hand.addCard("J-H")
      hand.addCard("Q-D")
      expect(hand.value).toBe(20)
    })

    test("calculates value for Aces as 11", () => {
      hand.addCard("A-H")
      hand.addCard("5-D")
      expect(hand.value).toBe(16)
    })

    test("calculates value for multiple Aces", () => {
      hand.addCard("A-H")
      hand.addCard("A-D")
      expect(hand.value).toBe(12)
    })

    test("calculates value for a mix of cards", () => {
      hand.addCard("A-H")
      hand.addCard("10-D")
      hand.addCard("3-S")
      expect(hand.value).toBe(14)
    })

    test("calculates value for a mix of cards with multiple Aces", () => {
      hand.addCard("A-H")
      hand.addCard("3-S")
      hand.addCard("A-S")
      hand.addCard("10-D")
      expect(hand.value).toBe(15)
    })

    test("calculates value for 4 Aces", () => {
      hand.addCard("A-H")
      hand.addCard("A-S")
      hand.addCard("A-D")
      hand.addCard("A-C")
      expect(hand.value).toBe(14)
    })
  })

  describe("aceCount", () => {
    test("counts the number of Aces in the hand", () => {
      hand.addCard("A-H")
      hand.addCard("A-D")
      hand.addCard("10-S")
      expect(hand.aceCount).toBe(2)
    })

    test("returns 0 when there are no Aces", () => {
      hand.addCard("10-H")
      hand.addCard("5-D")
      expect(hand.aceCount).toBe(0)
    })
  })
})
