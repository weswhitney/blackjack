import { BlackjackGame } from "../BlackjackGame.js"
import { Deck } from "../Deck.js"
import { Hand } from "../Hand.js"

jest.mock("../Deck.js")
jest.mock("../Hand.js")

describe("BlackjackGame", () => {
  let game

  beforeEach(() => {
    Deck.mockClear()
    Hand.mockClear()

    game = new BlackjackGame()
  })

  test("constructor initializes the game state correctly", () => {
    expect(game.dealerHand).toBeInstanceOf(Hand)
    expect(game.playerHand).toBeInstanceOf(Hand)
    expect(game.deck).toBeInstanceOf(Deck)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.playerTotal).toBe(0)
    expect(game.isPlaying).toBe(false)
  })

  test("resetState resets the game state", () => {
    game.resetState()
    expect(game.isPlaying).toBe(true)
    expect(game.canHit).toBe(true)
    expect(game.message).toBe("")
    expect(game.showHoleCard).toBe(false)
    expect(game.dealerTotal).toBe(0)
    expect(game.playerTotal).toBe(0)
    expect(game.dealerHand).toBeInstanceOf(Hand)
    expect(game.playerHand).toBeInstanceOf(Hand)
    expect(game.deck.shuffle).toHaveBeenCalled()
  })

  test("dealerTurn deals the initial hidden card to the dealer", () => {
    const mockCard = "A-H"
    game.deck.deal.mockReturnValueOnce(mockCard)

    game.dealerTurn()

    expect(game.dealerHand.addCard).toHaveBeenCalledWith(mockCard)
    expect(game.dealerHand.addCard).toHaveBeenCalledTimes(1)
  })

  test("dealerTurn continues dealing cards until dealer's total is at least 17", () => {
    const mockCards = ["5-H", "6-D", "7-S"]
    game.deck.deal
      .mockReturnValueOnce(mockCards[0]) // First card
      .mockReturnValueOnce(mockCards[1]) // Second card
      .mockReturnValueOnce(mockCards[2]) // Third card

    game.dealerHand.value = 10 // Initial value before loop
    game.dealerHand.addCard.mockImplementation((card) => {
      if (card === "5-H") game.dealerHand.value = 15
      if (card === "6-D") game.dealerHand.value = 21
    })

    game.dealerTurn()

    expect(game.dealerHand.addCard).toHaveBeenCalledWith("5-H")
    expect(game.dealerHand.addCard).toHaveBeenCalledWith("6-D")
    expect(game.dealerHand.addCard).not.toHaveBeenCalledWith("7-S")
    expect(game.dealerHand.addCard).toHaveBeenCalledTimes(2)
  })
})
